FROM node:lts-alpine as build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7049
COPY --from=build /app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]