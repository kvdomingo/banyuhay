from datetime import datetime

import sqlalchemy as sa
from pydantic import UUID4
from sqlalchemy import func as f
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class BaseModel(DeclarativeBase):
    __abstract__ = True

    id: Mapped[UUID4] = mapped_column(
        sa.VARCHAR(36),
        server_default=f.gen_random_uuid(),
        primary_key=True,
        nullable=False,
        index=True,
        unique=True,
    )
    created: Mapped[datetime] = mapped_column(server_default=f.now(), nullable=False)
    modified: Mapped[datetime] = mapped_column(server_default=f.now(), nullable=False)
