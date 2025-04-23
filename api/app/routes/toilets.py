from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from starlette import status

from app.db.generated.models import Toilet
from app.db.generated.toilets import AsyncQuerier
from app.db.queriers import get_toilet_async_querier

router = APIRouter(prefix="/toilets", tags=["toilets"])


@router.get("", response_model=list[Toilet])
async def list_toilets(querier: AsyncQuerier = Depends(get_toilet_async_querier)):
    return [t async for t in querier.list_toilets()]


@router.get("/{id}", response_model=Toilet)
async def get_toilet(
    id: UUID4, querier: AsyncQuerier = Depends(get_toilet_async_querier)
):
    toilet = await querier.get_toilet(id=str(id))
    if toilet is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return toilet
