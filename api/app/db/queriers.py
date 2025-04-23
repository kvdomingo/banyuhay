from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from app.db.generated import reviews, toilets
from app.db.utils import async_get_db, sync_get_db


def get_toilet_querier(conn: Session = Depends(sync_get_db)):
    return toilets.Querier(conn)


async def get_toilet_async_querier(conn: AsyncSession = Depends(async_get_db)):
    return toilets.AsyncQuerier(conn)


def get_review_querier(conn: Session = Depends(sync_get_db)):
    return reviews.Querier(conn)


async def get_review_async_querier(conn: AsyncSession = Depends(async_get_db)):
    return reviews.AsyncQuerier(conn)
