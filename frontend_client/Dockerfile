FROM node:12.13.1-alpine3.9 AS base


FROM base AS builder
WORKDIR /frontend_client
COPY . .
RUN yarn install
RUN yarn build --no-optimization

FROM alpine:latest AS prod
COPY --from=builder /frontend_client/build/. /frontend_client/

FROM base AS dev
WORKDIR /frontend_client
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
CMD yarn start

