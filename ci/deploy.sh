#!/bin/bash

pwd
ls -la

ssh root@172.17.0.120 'cd /home/hmadmin && docker-compose restart'