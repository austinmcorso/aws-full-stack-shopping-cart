variable "access_key" {}
variable "secret_key" {}

variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "us-east-1"
}

variable "availability_zones" {
  description = "List of availability zones, use AWS CLI to find your "
  default     = "us-east-1b,us-east-1c"
}

variable "aws_amis" {
  default = {
    us-east-1 = "ami-b73b63a0"
  }
}
