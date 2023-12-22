FROM node:20

WORKDIR /app

COPY ./package*.json .

CMD ["npm", "install"]

CMD ["npm", "run", "build"]

COPY . .

EXPOSE 3000
CMD [ "node", "dist/main.js"]
