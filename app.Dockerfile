FROM oven/bun:1-alpine AS build

WORKDIR /tmp

COPY ./ui/package.json ./ui/bun.lock ./

SHELL [ "/bin/sh", "-eu", "-c" ]

RUN --mount=type=cache,target=/root/.bun/install/cache \
  bun install --frozen-lockfile

COPY ./ui/ ./

ARG VITE_APP_HOST
ARG VITE_STYTCH_PUBLIC_TOKEN

ENV VITE_APP_HOST=${VITE_APP_HOST}
ENV VITE_STYTCH_PUBLIC_TOKEN=${VITE_STYTCH_PUBLIC_TOKEN}

# hadolint ignore=DL4006
RUN bun run build

FROM oven/bun:1-alpine AS prod

WORKDIR /app

COPY --from=build /tmp/.output /app/.output
COPY ui/package.json ui/bun.lock ./

ENTRYPOINT [ "/bin/sh", "-eu" ]
CMD [ "-c", "exec bun run start" ]
