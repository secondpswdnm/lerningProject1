FROM node:20.11

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

