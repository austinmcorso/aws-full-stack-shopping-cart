variable "access_key" {}
variable "account_id" {}
variable "secret_key" {}
variable "aws_s3_bucket_name" {}
variable "db_pass" {}
variable "public_key_path" {}

variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "us-east-1"
}

variable "availability_zone_1" {
  default     = "us-east-1a"
}

variable "availability_zone_2" {
  default     = "us-east-1b"
}

variable "aws_amis" {
  default = {
    us-east-1 = "ami-b73b63a0"
  }
}
