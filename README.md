# aws-full-stack-todo
An exercise in utilizing many AWS services (VPC, EC2, ELB, S3, Route53, CloudFront, Dynamo, RDS, SQS, SNS, plus React)

Technologies:
VPC w/ private and public subnets
Network ACL’s and security groups
Internet gateway and NAT
EC2 and EBS
S3
RDS
Dynamo
Cloudfront
Route53
SNS, SQS
Cloudwatch, Cloudtrail, IAM
Cloudformation


Architecture
VPC with two public (east-a, east-b) and two private subnets (east-c, east-d)
ELB round robin between two backend instances
Node.js REST API in EC2 micro instance within a public subnet (east-a)
RDS within private subnets (east-c, east-d)
Dynamo within private subnets (east-c, east-d)
React App in S3
SQS + SNS for queueing emailing of todos
Route53 DNS failover to Cloudfront static page
