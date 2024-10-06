from datetime import datetime

from pydantic import (
    UUID4,
    BaseModel as PydanticBaseModel,
)


class BaseModel(PydanticBaseModel):
    id: UUID4
    created: datetime
    modified: datetime


class Coordinates(PydanticBaseModel):
    lat: float
    lng: float
