FROM node:18.12.0-alpine as base

RUN apk add tzdata

RUN apk add python3 make g++

ENV TZ Europe/Lisbon

MAINTAINER Ikaro C. Laborda <iclaborda@msn.com>

FROM base as dev

COPY . /app

WORKDIR /app

EXPOSE 3000

RUN npm install

ENTRYPOINT ["sh", "/app/docker/docker-entrypoint.sh"]