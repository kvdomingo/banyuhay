"""fix toilet geometry wgs84 order

Revision ID: b4c8e2a91d3f
Revises: 5808855e1333
Create Date: 2026-03-22 12:00:00.000000

"""

from collections.abc import Sequence
from pathlib import Path

import sqlalchemy as sa
from alembic import op

revision: str = "b4c8e2a91d3f"
down_revision: str | None = "5808855e1333"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

MIGRATIONS_DIR = Path(__file__).resolve().parent
MIGRATION_NAME = Path(__file__).stem


def upgrade() -> None:
    with open(MIGRATIONS_DIR / f"{MIGRATION_NAME}.up.sql") as f:
        sql = f.read()

    conn = op.get_bind()
    conn.execute(sa.text(sql))


def downgrade() -> None:
    with open(MIGRATIONS_DIR / f"{MIGRATION_NAME}.down.sql") as f:
        sql = f.read()

    conn = op.get_bind()
    conn.execute(sa.text(sql))
