import sys

import yaml
from sqlalchemy.dialects.postgresql import insert

from api import models
from api.db import sync_get_db_context
from api.settings import settings

FIXTURES_DIR = settings.BASE_DIR / "api/fixtures"


def main(*args: str):
    fixture_stems = [f.stem for f in FIXTURES_DIR.glob("*")]

    for name in args:
        if name not in fixture_stems:
            raise FileNotFoundError(f"Fixture `{name}` not found.")

    for name in args:
        with open(FIXTURES_DIR / f"{name}.yml") as f:
            fixtures = yaml.safe_load(f)

        if len(fixtures) == 0:
            continue

        model = fixtures[0]["model"]
        Model = getattr(models, model)

        values = []
        for fixture in fixtures:
            value = {**fixture["fields"], "id": fixture["id"]}
            values.append(value)

        with sync_get_db_context() as db:
            stmt = insert(Model).values(values)
            db.execute(stmt.on_conflict_do_nothing())
            db.commit()


if __name__ == "__main__":
    args = sys.argv[1:]
    main(*args)
