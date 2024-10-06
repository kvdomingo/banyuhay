from pydantic import UUID4, conint

from .base import BaseModel
from .toilet import Toilet


class Review(BaseModel):
    toilet_id: UUID4
    toilet: Toilet
    content: str
    rating_water_pressure: conint(ge=0, le=5)
    rating_cleanliness: conint(ge=0, le=5)
    rating_poopability: conint(ge=0, le=5)
    has_bidet: bool
    is_approved: bool
    upvotes: conint(ge=0)
    downvotes: conint(ge=0)
    photos: list[str]
