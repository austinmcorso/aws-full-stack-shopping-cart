const fs = require('fs');
const https = require('https');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// init
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
  // const products = [
  //   {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  //   {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  //   {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
  // ];
  // res.json({ products });
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
  const cart = {
    0: 1,
    1: 1,
  }
  res.json({ cart });
})

/**
 * POST '/cart'
 * Update cart.
 * @param  {Object} req
 * @return {Object} json
 */
router.post('/cart/:email', (req, res) => {
  res.sendStatus(200);
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
