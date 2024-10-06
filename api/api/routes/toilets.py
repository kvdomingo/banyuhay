from fastapi import APIRouter, Depends
from pydantic import UUID4
from sqlalchemy import bindparam, select
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import async_get_db
from api.models import Review, Toilet
from api.schemas import (
    Review as ReviewSchema,
    Toilet as ToiletSchema,
)

router = APIRouter(prefix="/api/toilets", tags=["toilets"])


@router.get("", response_model=list[ToiletSchema])
async def list_toilets(db: AsyncSession = Depends(async_get_db)):
    return await db.scalars(select(Toilet).order_by(Toilet.created.desc()))


@router.get("/{id}/reviews", response_model=list[ReviewSchema])
async def list_toilet_reviews(id: UUID4, db: AsyncSession = Depends(async_get_db)):
    return await db.scalars(
        select(Review)
        .where(Review.toilet_id == bindparam("id"))
        .order_by(Review.created.desc()),
        {"id": str(id)},
    )
