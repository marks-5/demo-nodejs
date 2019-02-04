FROM node:alpine

WORKDIR /src

COPY package.json package.json

RUN export PATH="$(dirname $(npm config get python)):$PATH"

RUN npm install

COPY server.js server.js

EXPOSE 80

CMD ["node", "/src/server.js"]
