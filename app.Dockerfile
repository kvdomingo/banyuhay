FROM oven/bun:1-alpine AS build

WORKDIR /tmp

COPY ./ui/ ./

ARG VITE_PUBLIC_APP_HOST
ARG VITE_PUBLIC_STYTCH_PUBLIC_TOKEN

SHELL [ "/bin/sh", "-eu", "-c" ]

# hadolint ignore=DL4006
RUN bun install && bun run build

FROM oven/bun:1-alpine AS prod

COPY --from=build /tmp/.output /app

WORKDIR /app

ENTRYPOINT [ "/bin/sh", "-eu" ]
CMD [ "-c", "exec bun server.mjs" ]
