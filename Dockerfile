FROM python:3.12-bullseye

ENV DEBIAN_FRONTEND=noninteractive
ENV POETRY_VERSION=1.8.5
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_CREATE=true
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV PATH="${POETRY_HOME}/bin:${PATH}"

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

# hadolint ignore=DL3009
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl
    
ADD https://install.python-poetry.org install-poetry.py

RUN python install-poetry.py

WORKDIR /app

ENTRYPOINT [ "/bin/bash", "-euxo", "pipefail", "-c" ]
