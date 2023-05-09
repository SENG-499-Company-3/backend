FROM node:lts

EXPOSE 27017
ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD admin
ENV MONGO_INITDB_DATABASE schedule_backend

WORKDIR /go/src/app

COPY src .

RUN npm install
RUN npm run build

CMD ["npm","run","start"]