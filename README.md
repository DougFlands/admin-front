# ADMIN 配套前端项目
## 目前功能
* 文件增删查改
* 用户注册，需用户为admin权限

# 搭建方式 (仅本地启动需要修改以下文件)
* 修改 `/docker` 内 `route` 文件 `match`  域名
* 修改 `/config/proxy.ts` 域名
* 修改 `/src/utils/request.ts` 域名部分
* 打包镜像 `npm run docker:build`
