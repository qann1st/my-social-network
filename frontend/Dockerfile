FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE $PORT

CMD ["npm", "run", "start"]
