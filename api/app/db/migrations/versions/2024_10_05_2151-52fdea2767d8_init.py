"""init

Revision ID: 52fdea2767d8
Revises:
Create Date: 2024-10-05 21:51:23.562234

"""

from collections.abc import Sequence
from pathlib import Path

import sqlalchemy as sa
from alembic import op

from app.settings import settings

# revision identifiers, used by Alembic.
revision: str = "52fdea2767d8"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

MIGRATIONS_DIR = settings.BASE_DIR / "migrations/versions"
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
