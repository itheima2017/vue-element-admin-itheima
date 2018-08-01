#!/bin/bash

pwd
ll

# npm i --registry=https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm i
npm run build

docker build -t 172.17.0.57:5000/hmadmin-vue:1.0.$CI_PIPELINE_ID .
docker tag 172.17.0.57:5000/hmadmin-vue:1.0.$CI_PIPELINE_ID 172.17.0.57:5000/hmadmin-vue:latest
docker push 172.17.0.57:5000/hmadmin-vue:latest

docker rmi -f $(docker images | grep hmadmin-vue)

ssh root@172.17.0.120 'cd /home/hmadmin && docker-compose restart'