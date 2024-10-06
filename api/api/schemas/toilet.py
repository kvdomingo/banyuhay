from geoalchemy2 import WKBElement
from geoalchemy2.shape import to_shape
from pydantic import Field, confloat, conint, constr, field_validator
from shapely import Point

from .base import BaseModel, Coordinates


class Toilet(BaseModel):
    establishment_name: constr(min_length=1)
    geometry: Coordinates
    location_information: constr(min_length=1)
    avg_rating_water_pressure: confloat(ge=0, le=5)
    avg_rating_cleanliness: confloat(ge=0, le=5)
    avg_rating_poopability: confloat(ge=0, le=5)
    total_reviews: conint(ge=0)
    has_bidet: bool
    upvotes: conint(ge=0)
    downvotes: conint(ge=0)
    photos: list[str] = Field(default_factory=list)

    @field_validator("geometry", mode="before")
    @classmethod
    def geometry_as_coordinates(cls, v: WKBElement) -> Coordinates:
        shape: Point = to_shape(v)
        return Coordinates(lat=shape.y, lng=shape.x)
