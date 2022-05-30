# FROM node:10.16.3-alpine
FROM alpine

RUN apk add --update nodejs yarn

WORKDIR /app/comments

COPY package*.json .

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8084

CMD [ "yarn", "start" ]
