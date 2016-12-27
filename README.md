# aws-full-stack-shopping-cart
An exercise in utilizing many AWS services (VPC, EC2, ELB, S3, Route53, CloudFront, Dynamo, RDS, SQS, SNS, plus React)

Technologies:

* VPC w/ private and public subnets
* Network ACL’s and security groups
* Internet gateway and NAT
* EC2 and EBS
* S3
* RDS
* Dynamo
* Cloudfront
* Route53
* SNS, SQS
* Cloudwatch, Cloudtrail, IAM
* Terraform
* React/Redux

Architecture:

* VPC with two private app subnets and two private db subnets, each with unique least-privilege security groups
* Auto-scaling group with ELB round robin between two backend instances
* Node.js REST API in EC2 micro instance within private app subnets
* RDS within two private db subnets
* Dynamo within two private db subnets
* React App in S3
* Credentials stored in private S3 bucket with only access granted via VPC endpoint to EC2
* SQS + SNS for queueing emailing of todos
* Route53 DNS failover to Cloudfront static page

Instructions:

1. Build AWS infrastucture
  * npm start
1. Update client to point to new ELB
  * create /client/src/config.js from example file  to point to ELB DNS entry
  * cd /client; npm run build
  * update index.html JS link to be relative
  * upload /client/build files to S3 and set ACL to public read
