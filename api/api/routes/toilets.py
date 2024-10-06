from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import async_get_db
from api.models import Toilet
from api.schemas import Toilet as ToiletSchema

router = APIRouter(prefix="/api/toilets", tags=["toilets"])


@router.get("", response_model=list[ToiletSchema])
async def list_toilets(db: AsyncSession = Depends(async_get_db)):
    return await db.scalars(select(Toilet))
