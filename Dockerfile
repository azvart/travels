FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

COPY . .

RUN npm ci
ARG BUILD_APP
ARG APP_PORT
RUN npm run build $BUILD_APP

EXPOSE ${APP_PORT}

ARG RUN_APP
CMD ["sh", "-c", "node dist/apps/$RUN_APP/main.js"]
