from pydantic import UUID4, conint

from .base import BaseModel


class Review(BaseModel):
    toilet_id: UUID4
    content: str
    rating_water_pressure: conint(ge=0, le=5)
    rating_cleanliness: conint(ge=0, le=5)
    rating_poopability: conint(ge=0, le=5)
    has_bidet: bool
    is_approved: bool
    upvotes: conint(ge=0)
    downvotes: conint(ge=0)
    photos: list[str]
