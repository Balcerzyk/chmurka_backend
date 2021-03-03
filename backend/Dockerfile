FROM node:15.8.0

WORKDIR /usr/backend

COPY package*.json ./
COPY .env ./

RUN npm install

EXPOSE 8000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]