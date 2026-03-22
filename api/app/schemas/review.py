from pydantic import UUID4, Field

from .base import BaseModel


class Review(BaseModel):
    toilet_id: UUID4
    content: str
    rating_water_pressure: int = Field(ge=0, le=5)
    rating_cleanliness: int = Field(ge=0, le=5)
    rating_poopability: int = Field(ge=0, le=5)
    has_bidet: bool
    is_approved: bool
    upvotes: int = Field(ge=0)
    downvotes: int = Field(ge=0)
    photos: list[str]
