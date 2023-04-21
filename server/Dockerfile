FROM node:alpine as builder
RUN apk --update add python3 g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist .
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]