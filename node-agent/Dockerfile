FROM node:7.5.0

COPY package.json /app/
WORKDIR /app

RUN npm install

COPY ./index.js ./index.js
COPY ./config.js ./config.js

CMD npm run -s start
