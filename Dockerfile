FROM node:16.13-alpine

WORKDIR /app

COPY . .
COPY package*.json .
COPY yarn.lock .

RUN yarn

EXPOSE 7500

CMD ["yarn", "run", "serve"]