ARG NODE_VERSION=20.17-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:${NODE_VERSION}
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --only=production

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["npm", "start"]
