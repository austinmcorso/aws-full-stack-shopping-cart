const fs = require('fs');
const exec = require('child_process').exec;

function replaceInFile(fromFileName, toFileName, fromValue, toValue) {
  const data = fs.readFileSync(fromFileName, 'utf-8');
  const newData = data.replace(fromValue, toValue);
  fs.writeFileSync(toFileName, newData, 'utf-8');
}

const regex = /aws_s3_bucket_name = "(.+)"/g;
const s3_bucket_name = regex.exec(fs.readFileSync('architecture/terraform.tfvars', 'utf-8'));

if (!s3_bucket_name || !s3_bucket_name[1]) {
  console.error("Unable to read s3 bucket name from terraform.tfvars.").
  return;
}

// Terraform doesn't allow for variable interpolation in files :(
replaceInFile(
  'architecture/ec2-startup.template.sh',
  'architecture/ec2-startup.sh',
  '${S3_SECRETS}',
  s3_bucket_name[1]
);
exec('cd architecture && terraform apply', function (error, stdout, stderr) {
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
