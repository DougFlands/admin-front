## ADMIN 配套前端项目

使用 ant-design-pro 为模板构建，项目使用方式可以看官方文档

> https://pro.ant.design/index-cn/

# 目前功能

- 文件增删查改
- 用户注册，需用户为 admin 权限

# 搭建方式

- 修改 `/config/proxy.ts` 域名 (仅本地启动需要修改)
- 修改 `/docker` 内 `route` 文件 `match` 域名
- 修改 `/src/utils/request.ts` 域名部分
- 打包镜像 `npm run docker:buil`
