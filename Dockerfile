FROM node AS builder

WORKDIR /usr/src/app/

COPY package.json ./

ENV SHARP_DIST_BASE_URL=https://npm.taobao.org/mirrors/sharp-libvips/v8.8.1/

RUN npm install

COPY ./ ./
# 在构建之前格式化代码，理论上允许此类错误出现
RUN npm run lint
RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
