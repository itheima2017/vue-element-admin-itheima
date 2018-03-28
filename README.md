# [vue-element-admin-itheima](https://github.com/itheima2017/vue-element-admin-itheima)

[![vue](https://img.shields.io/badge/vue-2.5.9-brightgreen.svg ':no-zoom')](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.0.5-brightgreen.svg ':no-zoom')](https://github.com/ElemeFE/element)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg ':no-zoom')](https://github.com/itheima2017/vue-element-admin-itheima/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/itheima2017/vue-element-admin-itheima.svg ':no-zoom')](https://github.com/itheima2017/vue-element-admin-itheima/releases)
[![GitHub stars](https://img.shields.io/github/stars/itheima2017/vue-element-admin-itheima.svg?style=social&label=Stars ':no-zoom')](https://github.com/itheima2017/vue-element-admin-itheima)

## 介绍

vue-element-admin-itheima 是一个企业级后台管理方案，集成了 用户、菜单权限、界面权限点、登录、常用界面组件，后端采用 `Java SprintBoot2`。

* [在线演示](http://vueAdmin.itcast.cn)
* [前端代码 Vue](https://github.com/itheima2017/vue-element-admin-itheima)
* [后端代码 Java](https://github.com/itheima2017/vue-element-admin-api-java-itheima)
* [API 文档](http://research.itcast.cn/vue-element-admin-api-doc-itheima/_book/)
* [帮助文档](http://research.itcast.cn/vue-element-admin-doc-itheima/)

## 功能

* [x] 用户面板
* [x] 用户登录
* [x] 用户注销
* [x] 用户菜单权限
* [x] 用户页面权限点
* [x] 当前面包靴
* [x] 多语言支持
* [x] 全屏显示
* [x] 修改样式主色调
* [x] 界面缓存
* [x] 导航标签
* [x] 错误页面-401
* [x] 错误页面-404
* [x] 前端错误日志
* [x] 用户管理
* [x] 菜单管理
* [x] 权限管理
* [x] 日志管理
* [x] 示例-表格列表
* [x] 示例-表单提交

## 技术栈

* 前端

  * vue 2.5++
  * elementUI 2.2.2
  * vuex
  * axios
  * vue-router
  * vue-i18n

* 后端

  * Spring boot 2.0
  * Spring Security
  * Spring Data JPA
  * auth0 jwt
  * MySQL

## 环境要求

* node 8.++
* npm 5.++
* jdk 8.++

## 运行

* 后端

```bash
# 克隆项目
git clone https://github.com/itheima2017/vue-element-admin-api-java-itheima.git

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev
```

* 前端

```bash
# 克隆项目
git clone https://github.com/itheima2017/vue-element-admin-itheima.git

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev
```

?> 强烈建议不要用直接使用 cnpm 安装有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题

```bash
npm install --registry=https://registry.npm.taobao.org
```

打开浏览器访问 http://localhost:9527

![](https://wpimg.wallstcn.com/1bc334a6-32a8-4f29-a037-ac3f5ce32588.png)

## 发布

* 后端

```bash

```

* 前端

```bash
>> npm run build

Hash: 9dd56b56e0c0db93c932
Version: webpack 3.11.0
Time: 20979ms
                                                  Asset       Size  Chunks                    Chunk Names
    static/css/app.df68eba4405f15f5b344ec63333ee47f.css     201 kB      11  [emitted]         app
                 static/fonts/element-icons.6f0a763.ttf      11 kB          [emitted]
                             static/img/401.089007e.gif     164 kB          [emitted]
                    static/js/0.a803cb94e0f82ef375a2.js    40.6 kB    0, 3  [emitted]
                    static/js/1.25ac94fd9f91feed1737.js    8.14 kB       1  [emitted]
                    static/js/2.4eaa09e7119ee8c55e90.js    1.93 kB       2  [emitted]
                    static/js/3.af143fe5b62abedb6061.js    2.07 kB       3  [emitted]
                    static/js/4.c64df6ba7177531478a0.js  466 bytes       4  [emitted]
                    static/js/5.1960cd9fcc025628b204.js  480 bytes       5  [emitted]
                    static/js/6.2e89b70de27b932b121a.js  466 bytes       6  [emitted]
                    static/js/7.58bcc8ea9e9aa17db097.js  466 bytes       7  [emitted]
                    static/js/8.6b7e742b185b0a28b5ec.js  531 bytes       8  [emitted]
                    static/js/9.5d4e1b3e668683969958.js  379 bytes       9  [emitted]
               static/js/vendor.7b937696033463974717.js     776 kB      10  [emitted]  [big]  vendor
                  static/js/app.201822aae8242efcdebf.js    89.2 kB      11  [emitted]         app
             static/js/manifest.11660fe906e412e8aaf8.js    1.69 kB      12  [emitted]         manifest
                             static/img/404.a57b6f3.png    98.1 kB          [emitted]
static/css/app.df68eba4405f15f5b344ec63333ee47f.css.map     307 kB          [emitted]
                static/js/0.a803cb94e0f82ef375a2.js.map     156 kB    0, 3  [emitted]
                static/js/1.25ac94fd9f91feed1737.js.map    18.3 kB       1  [emitted]
                static/js/2.4eaa09e7119ee8c55e90.js.map    8.81 kB       2  [emitted]
                static/js/3.af143fe5b62abedb6061.js.map    9.29 kB       3  [emitted]
                static/js/4.c64df6ba7177531478a0.js.map    3.23 kB       4  [emitted]
                static/js/5.1960cd9fcc025628b204.js.map    3.31 kB       5  [emitted]
                static/js/6.2e89b70de27b932b121a.js.map    3.23 kB       6  [emitted]
                static/js/7.58bcc8ea9e9aa17db097.js.map    3.22 kB       7  [emitted]
                static/js/8.6b7e742b185b0a28b5ec.js.map    3.46 kB       8  [emitted]
                static/js/9.5d4e1b3e668683969958.js.map    1.84 kB       9  [emitted]
           static/js/vendor.7b937696033463974717.js.map    3.01 MB      10  [emitted]         vendor
              static/js/app.201822aae8242efcdebf.js.map     227 kB      11  [emitted]         app
         static/js/manifest.11660fe906e412e8aaf8.js.map    8.18 kB      12  [emitted]         manifest
                                             index.html  527 bytes          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.
```

将 `dist` 目录下的文件，直接放到 nginx 服务器上的web目录

* `nginx.conf` 配置

```js
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost;
        index index.html index.htm;
    }
    location ^~ /api/ {
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://localhost:8001;
        proxy_redirect off;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

### 参考

* [PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)
* [PanJiaChen/vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template/)
* [docsify](https://github.com/QingWei-Li/docsify)

### 版权

[MIT](https://github.com/PanJiaChen/vueAdmin-template/blob/master/LICENSE) license.

@传智研究院-研发部

江苏传智播客教育科技股份有限公司 &nbsp;版权所有 Copyright 2006-2018, All Rights Reserved
