FROM python:3.12-slim AS base

ENV DEBIAN_FRONTEND=noninteractive
ENV POETRY_VERSION=1.8.5
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_CREATE=true
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV PATH="${POETRY_HOME}/bin:${PATH}"

WORKDIR /app

FROM base AS build

COPY ./api/pyproject.toml ./api/poetry.lock ./

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

# hadolint ignore=DL4006
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl

ADD https://install.python-poetry.org install-poetry.py

RUN python install-poetry.py && \
    poetry export --format requirements.txt --output requirements.txt && \
    python -m venv .venv && \
    ./.venv/bin/pip install -r requirements.txt

FROM oven/bun:1.1-alpine AS web-build

WORKDIR /tmp

COPY ./ui/ ./

ARG VITE_PUBLIC_APP_HOST
ARG VITE_PUBLIC_STYTCH_PUBLIC_TOKEN

SHELL [ "/bin/sh", "-eu", "-c" ]

# hadolint ignore=DL4006
RUN bun install && bun run build

FROM base AS prod

WORKDIR /app

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

COPY ./api ./
COPY --from=build /app/.venv ./.venv/
COPY --from=web-build /tmp/build ./static/

ENTRYPOINT [ "/app/.venv/bin/fastapi", "run", "--host", "0.0.0.0", "--port", "8000" ]
