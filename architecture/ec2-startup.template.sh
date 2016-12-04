#!/bin/bash

yum update -y
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum install -y nodejs git mysql
cd /opt
git clone https://github.com/austinmcorso/aws-full-stack-shopping-cart.git
cd /opt/aws-full-stack-shopping-cart/api/
echo "${S3_SECRETS}" > s3_url.txt
npm install
PORT=80 node ./bin/www
