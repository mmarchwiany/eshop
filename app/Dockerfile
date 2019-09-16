FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

EXPOSE ${APP_PORT}

CMD [ "npm", "run", "dev"]