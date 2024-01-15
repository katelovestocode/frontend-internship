# Dockerfile
FROM node:18-alpine AS prod

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]


# docker-compose.yml
version: "3.8"
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - /app
      - /node_modules
    ports:
      - 3000:3000