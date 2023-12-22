FROM node:20

WORKDIR /app

COPY . .
CMD ["npm", "install", "glob", "rimraf"]

CMD ["yarn"]

COPY . .
RUN yarn prebuild && yarn build

EXPOSE 3000
CMD [ "node", "dist/main.js"]
