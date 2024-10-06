from datetime import datetime

from pydantic import (
    UUID4,
    BaseModel as PydanticBaseModel,
    Field,
)


class BaseModel(PydanticBaseModel):
    id: UUID4
    created: datetime = Field(default_factory=datetime.now)
    modified: datetime = Field(default_factory=datetime.now)
