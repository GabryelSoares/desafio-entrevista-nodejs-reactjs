FROM node:20

WORKDIR /app

COPY . .
CMD ["npm", "install", "glob", "rimraf"]

CMD ["yarn"]

COPY . .
RUN npm start

EXPOSE 3000
