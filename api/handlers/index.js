const dynamodb = require('dynamodb');
const mysql = require('mysql');

const ddb = dynamodb.ddb({
  accessKeyId: '',
  secretAccessKey: ''
});
const sqldb = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

sqldb.connect();

sqldb.end();
