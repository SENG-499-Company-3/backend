FROM node:lts-bullseye

WORKDIR /api

# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm install && npm cache clean --force

COPY tsconfig.json ./

COPY src ./src
COPY .env ./

EXPOSE ${PORT}

RUN npm run build
CMD ["npm","run","start:dev"]