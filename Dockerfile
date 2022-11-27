FROM node:18-alpine

WORKDIR /code

COPY package*.json /
RUN npm install
COPY . .

CMD ["node", "index.js"]