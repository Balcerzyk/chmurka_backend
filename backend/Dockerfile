FROM node:15

WORKDIR /usr/backend

COPY package*.json ./
COPY .env ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 80

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]