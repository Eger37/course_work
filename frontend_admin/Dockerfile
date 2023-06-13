FROM node:12.13.1-alpine3.9 AS base


FROM base AS builder
WORKDIR /frontend_admin
COPY . .
RUN yarn install
RUN yarn build

FROM alpine:latest AS prod
COPY --from=builder /frontend_admin/build/. /frontend_admin/

FROM base AS dev
WORKDIR /frontend_admin
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
CMD yarn start
