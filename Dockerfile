FROM node:10-alpine as builder
WORKDIR /usr/src/ng
COPY package.json package-lock.json ./
RUN npm ci && mkdir /usr/src/app && mv ./node_modules /usr/src/app

WORKDIR /usr/src/app
COPY src/ ./src/
COPY angular.json .
COPY browserslist .
COPY karma.conf.js .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .

RUN npm run ng build --prod --aot

FROM nginx:1.14.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/troll /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
