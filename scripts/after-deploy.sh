#!/bin/bash
REPOSITORY=/home/ubuntu/projects/cyworld-refac


cd $REPOSITORY

npm install

sudo pm2 kill

sudo export NODE_ENV=production && pm2 start build/server.js
