from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from starlette import status

from app.db.generated.models import Review
from app.db.generated.reviews import AsyncQuerier
from app.db.queriers import get_review_async_querier

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[Review])
async def list_reviews(
    toilet_id: UUID4, querier: AsyncQuerier = Depends(get_review_async_querier)
):
    return [r async for r in querier.list_toilet_reviews(toilet_id=str(toilet_id))]


@router.get("/{id}", response_model=Review)
async def get_review(
    id: UUID4, querier: AsyncQuerier = Depends(get_review_async_querier)
):
    review = await querier.get_review(id=str(id))
    if review is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return review
