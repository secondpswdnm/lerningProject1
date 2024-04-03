FROM node:20.10

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "run", "server" ]

