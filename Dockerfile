# FROM node:18-alpine as build-stage

# WORKDIR /app
# RUN corepack enable

# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install

# COPY . .
# RUN pnpm build

FROM nginx:stable-alpine as production-stage

COPY ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]