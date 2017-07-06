FROM node:7.5.0

COPY package.json /app/
WORKDIR /app

RUN npm install

COPY ./lib ./lib

CMD npm run -s start
