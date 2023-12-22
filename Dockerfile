FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN echo "DB_HOST: $DB_HOST"
RUN echo "DB_NAME: $DB_NAME"
RUN echo "DB_USERNAME: $DB_USERNAME"
CMD ["npm", "run", "start"]
