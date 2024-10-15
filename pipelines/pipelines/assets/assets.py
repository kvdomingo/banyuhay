import json
from datetime import datetime
from pathlib import Path
from typing import Any
from uuid import uuid4

import googlemaps
import yaml
from dagster import AssetExecutionContext, MetadataValue, asset

from pipelines.settings import settings
from pipelines.utils import (
    get_caption,
    get_establishment_name,
    get_has_bidet,
    get_rating,
)


@asset
def entries(context: AssetExecutionContext) -> dict[str, str]:
    ent = {}
    for file in Path(settings.BASE_DIR / "data/meronbangbidet").glob("*.txt"):
        with open(file) as fh:
            ent[file.stem] = fh.read()

    context.add_output_metadata(
        {
            "entries": MetadataValue.json(ent),
            "count": MetadataValue.int(len(ent)),
        }
    )
    return ent


@asset
def meta_(
    context: AssetExecutionContext, entries: dict[str, str]
) -> list[dict[str, Any]]:
    out = []
    for key, value in entries.items():
        entry = value.split("\n")
        out.append(
            {
                "created": datetime.strptime(key, "%Y-%m-%d_%H-%M-%S_%Z").isoformat(),
                "content": get_caption(entry),
                "has_bidet": get_has_bidet(entry),
                "establishment_name": get_establishment_name(entry),
                "rating_water_pressure": get_rating(entry, "water pressure"),
                "rating_cleanliness": get_rating(entry, "cleanliness"),
                "rating_poopability": get_rating(entry, "poopability"),
            }
        )

    context.add_output_metadata(
        {
            "meta_": MetadataValue.json(out),
            "count": MetadataValue.int(len(out)),
        }
    )
    return out


@asset
def meta_with_geo(
    context: AssetExecutionContext, meta_: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

    out = []
    for i, m in enumerate(meta_):
        context.log.info(f"Geocode {i + 1}/{len(meta_)}")

        if m["establishment_name"] is not None:
            places = gmaps.places(m["establishment_name"], region="ph")
            context.log.info(places)
            if len(places["results"]) > 0:
                location = places["results"][0]["geometry"]["location"]
                lat = location["lat"]
                lng = location["lng"]
            else:
                lat = lng = None
        else:
            lat = lng = None

        out.append(
            {
                **m,
                "lat": lat,
                "lng": lng,
            }
        )

    with open(settings.BASE_DIR / "data/meta.json", "w+") as fh:
        json.dump(out, fh, indent=2)

    context.add_output_metadata(
        {
            "meta_": MetadataValue.json(out),
            "count": len(out),
        }
    )
    return out


@asset
def meta_with_geo_complete(
    context: AssetExecutionContext, meta_with_geo: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    rev = [m for m in meta_with_geo if m["lat"] is not None and m["lng"] is not None]

    with open(settings.BASE_DIR / "data/meta_geo.json", "w+") as fh:
        json.dump(rev, fh, indent=2)

    context.add_output_metadata(
        {
            "meta_geo": MetadataValue.json(rev),
            "count": MetadataValue.int(len(rev)),
        }
    )
    return rev


@asset
def meta_with_geo_for_human_review(
    context: AssetExecutionContext, meta_with_geo: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    rev = [m for m in meta_with_geo if m["lat"] is None or m["lng"] is None]

    with open(settings.BASE_DIR / "data/for_review.json", "w+") as fh:
        json.dump(rev, fh, indent=2)

    context.add_output_metadata(
        {
            "for_review": MetadataValue.json(rev),
            "count": MetadataValue.int(len(rev)),
        }
    )
    return rev


@asset
def meta_fixtures(
    context: AssetExecutionContext, meta_with_geo_complete: list[dict[str, Any]]
) -> None:
    toilets = []
    reviews = []

    for meta in meta_with_geo_complete:
        if not meta["establishment_name"]:
            continue

        toilet_id = str(uuid4())
        toilets.append(
            {
                "id": toilet_id,
                "model": "Toilet",
                "fields": {
                    "establishment_name": meta["establishment_name"].title(),
                    "location_information": meta["establishment_name"].title(),
                    "geometry": f"POINT({meta['lat']:.6f} {meta['lng']:.6f})",
                    "avg_rating_water_pressure": meta["rating_water_pressure"],
                    "avg_rating_cleanliness": meta["rating_cleanliness"],
                    "avg_rating_poopability": meta["rating_poopability"],
                    "total_reviews": 1,
                    "has_bidet": meta["has_bidet"],
                    "upvotes": 0,
                    "downvotes": 0,
                    "photos": [],
                },
            }
        )
        reviews.append(
            {
                "id": str(uuid4()),
                "model": "Review",
                "fields": {
                    "toilet_id": toilet_id,
                    "content": meta["content"],
                    "rating_water_pressure": meta["rating_water_pressure"],
                    "rating_cleanliness": meta["rating_cleanliness"],
                    "rating_poopability": meta["rating_poopability"],
                    "has_bidet": meta["has_bidet"],
                    "is_approved": True,
                    "upvotes": 0,
                    "downvotes": 0,
                    "photos": [],
                },
            }
        )

    with open(settings.BASE_DIR / "data/toilets.yml", "w+") as fh:
        yaml.safe_dump(
            toilets,
            fh,
            indent=2,
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
        )

    with open(settings.BASE_DIR / "data/reviews.yml", "w+") as fh:
        yaml.safe_dump(
            reviews,
            fh,
            indent=2,
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
        )

    context.add_output_metadata(
        {
            "toilets_count": MetadataValue.int(len(toilets)),
            "reviews_count": MetadataValue.int(len(reviews)),
        }
    )
