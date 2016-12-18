const fs = require('fs');
const https = require('https');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const AWS = require('aws-sdk');

// initialize DDB w/ credentials fetched via IAM role.
AWS.config.region = 'us-east-1';
const ddb = new AWS.DynamoDB();

// initialize RDS w/ credentials stored in S3.
const s3Url = `${fs.readFileSync('s3_url.txt', 'utf-8')}`.trim();
let connection;
https.get(`https://s3.amazonaws.com/${s3Url}-secrets/secrets.json`, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    secrets = JSON.parse(body);
    connection = mysql.createConnection({
      host     : secrets.db.host,
      user     : secrets.db.username,
      password : secrets.db.password,
      database : secrets.db.name
    });

    // TODO: Optimize and only create/add if needed.
    connection.query("CREATE TABLE products ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, price DECIMAL(6,2) NOT NULL )", err => console.error);
    connection.query("INSERT INTO products (title, price) VALUES ('iPad', 399.00)", err => console.error);
    connection.query("INSERT INTO products (title, price) VALUES ('iPhone', 299.00)", err => console.error);
    connection.query("INSERT INTO products (title, price) VALUES ('iPod', 108.29)", err => console.error);
  });
}).on('error', (e) => {
  console.log(`Error fetching secrets: ${e}`);
});

/**
 * GET '/products'
 * Get list of available products.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    res.json({ products: rows });
  });
})

/**
 * GET '/cart'
 * Get list of items in cart.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/cart/:email', (req, res) => {
  ddb.getItem({
    Key: {
      Email: {S: 'test'},
    },
  }, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    const cart = {};

    // TODO: error handling, put in abstraction layer.
    const items = data.Item.Items.M;
    Object.keys(items).forEach(key => { cart[key] = items[key].N });
    res.json(cart);
  });
})

/**
 * POST '/cart'
 * Update cart.
 * @param  {Object} req
 * @return {Object} json
 */
router.post('/cart/:email', (req, res) => {
  ddb.putItem({
    Item: {
      Email: {S: 'test'},
      Items: {M: {
        item: {N: '1'},
      }},
    },
  }, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
})

/**
 * POST '/checkout'
 * Process items in cart and send to email listed.
 * @param  {Object} req
 * @return {Object} json
 */
router.post('/checkout/:email', (req, res) => {
  res.sendStatus(200);
})

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
