FROM node:20

WORKDIR /app

COPY . .
CMD ["npm", "install", "glob", "rimraf"]

COPY . .
RUN npm start

EXPOSE 3000
