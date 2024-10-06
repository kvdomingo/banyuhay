from pydantic import Field, confloat, conint, constr
from shapely import Point

from .base import BaseModel


class Toilet(BaseModel):
    establishment_name: constr(min_length=1)
    geometry: Point
    location_information: constr(min_length=1)
    avg_rating_water_pressure: confloat(ge=0, le=5) = Field(0)
    avg_rating_cleanliness: confloat(ge=0, le=5) = Field(0)
    avg_rating_poopability: confloat(ge=0, le=5) = Field(0)
    has_bidet: bool = Field(False)
    upvotes: conint(ge=0) = Field(0)
    downvotes: conint(ge=0) = Field(0)
    photos: list[str] = Field(default_factory=list)
