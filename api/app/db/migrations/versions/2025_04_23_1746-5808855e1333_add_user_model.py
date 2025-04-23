"""add user model

Revision ID: 5808855e1333
Revises: 52fdea2767d8
Create Date: 2025-04-23 17:46:43.817420

"""

from collections.abc import Sequence
from pathlib import Path

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "5808855e1333"
down_revision: str | None = "52fdea2767d8"
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
