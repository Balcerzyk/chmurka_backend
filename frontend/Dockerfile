FROM node:14-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY rollup.config.js ./

COPY ./ ./

ENV HOST=0.0.0.0

RUN npm run build

FROM nginx:latest
COPY --from=0 /usr/app/public /usr/share/nginx/html/