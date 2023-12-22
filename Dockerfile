FROM node:20

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./. /app

CMD npm start
