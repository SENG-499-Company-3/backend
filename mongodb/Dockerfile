FROM mongo:5.0.17

EXPOSE 27017
ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD admin
ENV MONGO_INITDB_DATABASE schedule_backend

COPY mongo-init.js /docker-entrypoint-initdb.d/
