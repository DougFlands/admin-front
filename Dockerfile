FROM node:latest as builder

WORKDIR /usr/src/app
USER root

COPY . /usr/src/app
RUN yarn --registry https://registry.npm.taobao.org/ 
RUN yarn --production
RUN npm run build


FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]