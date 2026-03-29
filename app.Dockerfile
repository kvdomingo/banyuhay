FROM oven/bun:1-alpine AS build

WORKDIR /tmp

COPY ./ui/package.json ./ui/bun.lock ./

SHELL [ "/bin/sh", "-eu", "-c" ]

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

COPY ./ui/ ./

ARG VITE_PUBLIC_APP_HOST
ARG VITE_PUBLIC_STYTCH_PUBLIC_TOKEN

# hadolint ignore=DL4006
RUN bun run build

FROM oven/bun:1-alpine AS prod

COPY --from=build /tmp/.output /app

WORKDIR /app

ENTRYPOINT [ "/bin/sh", "-eu" ]
CMD [ "-c", "exec bun server/index.mjs" ]
