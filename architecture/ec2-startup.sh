sudo yum update -y
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum install -y nodejs
cd /opt
sudo git clone https://github.com/austinmcorso/aws-full-stack-shopping-cart.git
cd /opt/aws-full-stack-shopping-cart/api/
sudo npm install
sudo PORT=80 node ./bin/www
