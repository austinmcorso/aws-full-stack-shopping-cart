var express = require('express');
var router = express.Router();

/**
 * GET '/products'
 * Get list of available products.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/products', (req, res) => {
  const products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
  ];
  res.json({ products });
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
