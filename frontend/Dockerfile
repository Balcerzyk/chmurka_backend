FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY rollup.config.js ./

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]