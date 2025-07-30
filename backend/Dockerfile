FROM node:20-alpine AS base

# Needed for native modules like bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app


COPY ./package.json ./yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .

COPY .env .env

RUN yarn build

EXPOSE 8008

CMD ["node", "dist/app.js"]
