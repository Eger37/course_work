FROM python:3.7.4-alpine3.9 as base

RUN apk add --no-cache \
	build-base linux-headers libffi-dev \
	gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev fontconfig ttf-opensans \
	postgresql-dev \
	imagemagick
	# libxml2-dev libxslt-dev \

# timezone setup
RUN apk add --no-cache tzdata
# ENV TZ=UTC
ENV TZ=Europe/Paris

WORKDIR /app

ADD ./requirements.txt requirements.txt
RUN pip --no-cache-dir install -q -r requirements.txt

EXPOSE 8000

FROM base as prod
COPY ./ /app/
RUN pip --no-cache-dir install -q -e .
CMD pserve production.ini

FROM base as dev
ADD . /app
RUN python setup.py develop
CMD pserve development.ini --reload
