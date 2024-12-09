<div align="center">
<img src="./src/assets/svg/logo.svg" style="width:150px"/>
    <h1>Thoth Admin</h1>
</div>

## 介绍

Thoth Admin 是一个基于Vue3、Vite5、TypeScript、NaiveUI、Unocss等最新技术栈开发的后台管理模板，用简单的方式实现完整功能，并尽可能的考虑代码规范，易读易理解无过度封装，方便二次开发。

## 安装使用

本地开发环境建议使用 pnpm 8.x 、Node.js 必须 20.x

```bash
# install dependencies
pnpm i

# Run
pnpm dev

# Build product
pnpm build

```

在生产环境也可以使用 docker-compose 部署 **nova-admin**
```bash
# Build product
docker compose -f docker-compose.product.yml up --build -d
```
> 关于 nginx.conf 只供参考，你可以根据自己的需求进行调整。

## 协议

[MIT](LICENSE)
