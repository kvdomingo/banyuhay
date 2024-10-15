FROM python:3.12-slim AS base

FROM base AS build

ENV DEBIAN_FRONTEND=noninteractive
ENV POETRY_VERSION=1.8.3
ENV POETRY_HOME=/opt/poetry
ENV PATH=${PATH}:${POETRY_HOME}/bin

WORKDIR /app

COPY pyproject.toml poetry.lock ./

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -sSL https://install.python-poetry.org | python - && \
    poetry config virtualenvs.true true && \
    poetry config virtualenvs.in-project true && \
    poetry install --no-root --without dev && \
    rm -rf /var/lib/apt/lists/*

FROM base AS prod

WORKDIR /app

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

COPY . .
COPY --from=build /app/.venv ./.venv/

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
