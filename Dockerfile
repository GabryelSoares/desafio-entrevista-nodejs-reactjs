FROM node:20

WORKDIR /usr/projeto-revenda-backend

CMD ["npm", "install", "glob", "rimraf"]

CMD ["npm", "install"]

COPY . .

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]
