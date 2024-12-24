from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from stytch.consumer.models.users import User

from api.auth import session_cookie_scheme
from api.db import async_get_db
from api.models import Review
from api.schemas import Review as ReviewSchema

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[ReviewSchema])
async def list_reviews(db: AsyncSession = Depends(async_get_db)):
    return await db.scalars(select(Review))


@router.post("")
async def create_review(user: User = Depends(session_cookie_scheme)):
    pass
