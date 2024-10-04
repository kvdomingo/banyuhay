#!/bin/bash

set -euxo pipefail

poetry install --no-root
poetry run alembic upgrade head

exec poetry run uvicorn api:app --host 0.0.0.0 --port 8000 --reload
