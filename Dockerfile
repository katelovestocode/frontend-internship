FROM node:18-alpine AS prod

WORKDIR /app

COPY package*.json ./

EXPOSE 3000

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]