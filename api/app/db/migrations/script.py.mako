"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from typing import Sequence, Union
from pathlib import Path

from alembic import op
import sqlalchemy as sa

from app.settings import settings
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision: str = ${repr(up_revision)}
down_revision: Union[str, None] = ${repr(down_revision)}
branch_labels: Union[str, Sequence[str], None] = ${repr(branch_labels)}
depends_on: Union[str, Sequence[str], None] = ${repr(depends_on)}

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
