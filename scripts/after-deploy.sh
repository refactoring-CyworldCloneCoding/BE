#!/bin/bash
REPOSITORY=/home/ubuntu/projects


cd $REPOSITORY

npm install --no-optional

sudo su

pm2 kill

export NODE_ENV=production && pm2 start build/server.js
