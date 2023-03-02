#!/bin/bash
REPOSITORY=/home/ubuntu/sparta/project/src


cd $REPOSITORY

npm install

sudo pm2 kill

sudo export NODE_ENV=production && pm2 start build/server.js
