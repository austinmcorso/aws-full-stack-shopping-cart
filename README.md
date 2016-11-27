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

Architecture
* VPC with two private app (east-1b, east-1c) and two private db subnets (east-1b, east-1c)
* ELB round robin between two backend instances
* Node.js REST API in EC2 micro instance within private app subnets
* RDS within two private db subnets
* Dynamo within two private db subnets
* React App in S3
* SQS + SNS for queueing emailing of todos
* Route53 DNS failover to Cloudfront static page
