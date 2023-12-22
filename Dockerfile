FROM node:20

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY api/package.json .

RUN npm install

COPY api/. /app

CMD npm start
