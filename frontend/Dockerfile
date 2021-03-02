FROM node:14-alpine

WORKDIR /usr/app

COPY rollup.config.js ./
COPY package*.json ./

RUN npm install

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]