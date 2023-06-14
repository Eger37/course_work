FROM nginx:alpine as base


EXPOSE 89
EXPOSE 443
EXPOSE 80


FROM base as dev
COPY dev/nginx.conf /etc/nginx/conf.d/default.conf

FROM base as prod
COPY prod/nginx.conf /etc/nginx/conf.d/default.conf

