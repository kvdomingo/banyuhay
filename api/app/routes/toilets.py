from fastapi import APIRouter, Depends, HTTPException, Security
from pydantic import UUID4
from starlette import status
from starlette.responses import Response

from app.auth import session_cookie_scheme
from app.db.generated.models import Toilet
from app.db.generated.toilets import (
    AsyncQuerier,
    CreateToiletParams,
    UpdateToiletParams,
)
from app.db.queriers import get_toilet_async_querier

router = APIRouter(prefix="/toilets", tags=["toilets"])


@router.get("", response_model=list[Toilet])
async def list_toilets(querier: AsyncQuerier = Depends(get_toilet_async_querier)):
    return [t async for t in querier.list_toilets()]


@router.get("/{id}", response_model=Toilet)
async def get_toilet(
    id: UUID4, querier: AsyncQuerier = Depends(get_toilet_async_querier)
):
    if (toilet := await querier.get_toilet(id=str(id))) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return toilet


@router.post("", response_model=Toilet, dependencies=[Security(session_cookie_scheme)])
async def create_toilet(
    body: CreateToiletParams, querier: AsyncQuerier = Depends(get_toilet_async_querier)
):
    if (toilet := await querier.create_toilet(body)) is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    await querier._conn.commit()
    return toilet


@router.patch(
    "/{id}", response_model=Toilet, dependencies=[Security(session_cookie_scheme)]
)
async def update_toilet(
    response: Response,
    id: UUID4,
    body: UpdateToiletParams,
    querier: AsyncQuerier = Depends(get_toilet_async_querier),
):
    if id != body.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    if (toilet := await querier.update_toilet(body)) is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    await querier._conn.commit()
    response.status_code = status.HTTP_202_ACCEPTED
    return toilet


@router.delete("/{id}", dependencies=[Security(session_cookie_scheme)])
async def delete_toilet(
    response: Response,
    id: UUID4,
    querier: AsyncQuerier = Depends(get_toilet_async_querier),
):
    if await querier.delete_toilet(id=id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    await querier._conn.commit()
    response.status_code = status.HTTP_204_NO_CONTENT
