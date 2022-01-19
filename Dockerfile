FROM node:fermium-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3500
CMD node ./bin/www