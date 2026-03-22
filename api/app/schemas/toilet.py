from pydantic import field_validator

from app.db.generated.models import Toilet as ToiletBase

from .base import Coordinates


class Toilet(ToiletBase):
    geometry: Coordinates

    @field_validator("geometry", mode="before")
    @classmethod
    def geometry_as_coordinates(cls, v: dict) -> Coordinates:
        return Coordinates(lat=v["lat"], lng=v["lng"])
