FROM node:16.13-alpine

WORKDIR /app

COPY . .
COPY package*.json ./

RUN yarn

EXPOSE 7500

CMD ["yarn", "run", "start:dev"]