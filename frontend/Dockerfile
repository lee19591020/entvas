FROM node:20-alpine AS deps

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

COPY .env.local .env.local

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
