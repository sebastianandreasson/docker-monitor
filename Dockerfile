FROM node:6.1.0

COPY package.json /app/
WORKDIR /app

RUN npm install

COPY .babelrc ./
COPY gulpfile.js ./
COPY ./lib ./lib

COPY webpack.config.prod.js ./
COPY index.html ./

COPY ./src ./src
ARG API__URL
RUN npm run build

EXPOSE 4000
CMD npm run -s start
