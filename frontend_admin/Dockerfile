FROM node:12.13.1-alpine3.9 AS base


FROM base AS builder
WORKDIR /frontend_admin
COPY . .
RUN yarn install
RUN yarn build --no-optimization

FROM alpine:latest AS prod
COPY --from=builder /frontend_admin/build/. /frontend_admin/

FROM base AS dev
WORKDIR /frontend_admin
COPY package.json ./
COPY yarn.lock ./

CMD ./dev-entrypoint.sh

