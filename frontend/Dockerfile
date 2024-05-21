
#stage 1

FROM node:alpine3.18 as build

ARG REACT_APP_SERVICES_HOST=/services/m

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . .

RUN npm run dev


# stage 2

FROM nginx:1.23-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html