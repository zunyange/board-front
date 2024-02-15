#어떤 이미지를 만들것인지, 프로젝트에 어떤 것들이 필요한지 명시하는 곳

FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY index.js .

ENTRYPOINT [ "node", "index.js" ]