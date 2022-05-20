FROM docker.io/node:lts-alpine3.15

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

WORKDIR /app

COPY app.js /app/app.js
COPY package.json /app/package.json

RUN apk add --no-cache chromium

RUN npm install

ENTRYPOINT [ "node", "app.js" ]