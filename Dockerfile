
FROM node:24-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

ARG SERVICE_NAME
RUN npm run build ${SERVICE_NAME}


FROM node:24-alpine

WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

COPY --from=builder /app/dist/apps/${SERVICE_NAME} ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/${SERVICE_NAME}/main.js"]

