import sqlalchemy as sa
from geoalchemy2 import Geometry
from pydantic import UUID4
from shapely import Point
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class Toilet(BaseModel):
    __tablename__ = "toilets"

    establishment_name: Mapped[str] = mapped_column(nullable=False)
    geometry: Mapped[Point] = mapped_column(Geometry("POINT"), nullable=False)
    location_information: Mapped[str] = mapped_column(nullable=False)
    avg_rating_water_pressure: Mapped[float] = mapped_column(nullable=False, default=0)
    avg_rating_cleanliness: Mapped[float] = mapped_column(nullable=False, default=0)
    avg_rating_poopability: Mapped[float] = mapped_column(nullable=False, default=0)
    total_reviews: Mapped[int] = mapped_column(nullable=False, default=0)
    has_bidet: Mapped[bool] = mapped_column(nullable=False, default=False)
    upvotes: Mapped[int] = mapped_column(nullable=False, default=0)
    downvotes: Mapped[int] = mapped_column(nullable=False, default=0)
    photos: Mapped[list[str]] = mapped_column(sa.ARRAY(sa.VARCHAR(255)))
    reviews: Mapped[list["Review"]] = relationship(back_populates="toilet")


class Review(BaseModel):
    __tablename__ = "reviews"

    toilet_id: Mapped[UUID4] = mapped_column(
        sa.ForeignKey("toilets.id"), nullable=False
    )
    toilet: Mapped["Toilet"] = relationship(back_populates="reviews")
    content: Mapped[str] = mapped_column()
    rating_water_pressure: Mapped[int] = mapped_column(nullable=False)
    rating_cleanliness: Mapped[int] = mapped_column(nullable=False)
    rating_poopability: Mapped[int] = mapped_column(nullable=False)
    has_bidet: Mapped[bool] = mapped_column(nullable=False, default=False)
    is_approved: Mapped[bool] = mapped_column(nullable=False, default=False)
    upvotes: Mapped[int] = mapped_column(nullable=False, default=0)
    downvotes: Mapped[int] = mapped_column(nullable=False, default=0)
    photos: Mapped[list[str]] = mapped_column(sa.ARRAY(sa.VARCHAR(255)))
