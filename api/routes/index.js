var express = require('express');
var router = express.Router();

/**
 * GET '/products'
 * Get list of available products.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/products', (req, res) => {
  res.sendStatus(200);
})

/**
 * GET '/cart'
 * Get list of items in cart.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/cart', (req, res) => {
  res.sendStatus(200);
})

/**
 * POST '/cart'
 * Update cart.
 * @param  {Object} req
 * @return {Object} json
 */
router.post('/cart', (req, res) => {
  res.sendStatus(200);
})

/**
 * POST '/checkout'
 * Process items in cart and send to email listed.
 * @param  {Object} req
 * @return {Object} json
 */
router.post('/checkout', (req, res) => {
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
