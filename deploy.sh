#!/bin/bash

sudo systemctl stop node-app.service

sudo rm -rf /home/ec2-user/app/*

cd /home/ec2-user/app/

sudo aws s3 cp s3://bucket-028266843830/dev/simple-node-app.zip .

sudo unzip simple-node-app.zip

sudo systemctl start node-app.service