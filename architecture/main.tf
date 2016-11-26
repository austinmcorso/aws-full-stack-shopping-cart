provider "aws" {
  region = "${var.aws_region}"
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
}

# VPC
resource "aws_vpc" "default" {
  cidr_block = "10.0.0.0/16"
}
resource "aws_internet_gateway" "default" {
  vpc_id = "${aws_vpc.default.id}"
}
resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.default.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.default.id}"
}

# SUBNETS
resource "aws_subnet" "app_1" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}
resource "aws_subnet" "app_2" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
}
resource "aws_subnet" "db_1" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.3.0/24"
}
resource "aws_subnet" "db_2" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.4.0/24"
}

# SECURITY GROUPS
resource "aws_security_group" "web" {
  name        = "sg_web"
  vpc_id      = "${aws_vpc.default.id}"

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "app" {
  name        = "sg_app"
  vpc_id      = "${aws_vpc.default.id}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from the VPC
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "db" {
  name        = "sg_db"
  vpc_id      = "${aws_vpc.default.id}"

  # HTTP access from the VPC
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "web" {
  name = "elb"
  subnets         = ["${aws_subnet.app_1.id}", "${aws_subnet.app_2.id}"]
  security_groups = ["${aws_security_group.web.id}"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }
}

resource "aws_autoscaling_group" "app" {
  name                 = "asg"
  vpc_zone_identifier  = ["${aws_subnet.app_1.id}", "${aws_subnet.app_2.id}"]
  max_size             = "4"
  min_size             = "2"
  desired_capacity     = "2"
  force_delete         = true
  launch_configuration = "${aws_launch_configuration.app.name}"
  load_balancers       = ["${aws_elb.web.name}"]
}

resource "aws_launch_configuration" "app" {
  name          = "lc"
  image_id      = "${lookup(var.aws_amis, var.aws_region)}"
  instance_type = "t2.micro"
  security_groups = ["${aws_security_group.app.id}"]
}
