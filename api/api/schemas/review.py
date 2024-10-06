from pydantic import UUID4, Field, conint

from .base import BaseModel
from .toilet import Toilet


class Review(BaseModel):
    toilet_id: UUID4
    toilet: Toilet
    content: str
    rating_water_pressure: conint(ge=0, le=5)
    rating_cleanliness: conint(ge=0, le=5)
    rating_poopability: conint(ge=0, le=5)
    has_bidet: bool = Field(False)
    is_approved: bool = Field(False)
    upvotes: conint(ge=0) = Field(0)
    downvotes: conint(ge=0) = Field(0)
    photos: list[str] = Field(default_factory=list)
