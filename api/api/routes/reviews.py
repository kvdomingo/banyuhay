from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import async_get_db
from api.models import Review
from api.schemas import Review as ReviewSchema

router = APIRouter(prefix="/api/reviews", tags=["reviews"])


@router.get("", response_model=list[ReviewSchema])
async def list_reviews(db: AsyncSession = Depends(async_get_db)):
    return await db.scalars(select(Review))
