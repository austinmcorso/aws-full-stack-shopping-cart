// TODO: split actions.
// TODO: better error handling.
// TODO: move to redux loop or sagas.

import * as types from '../constants/ActionTypes'
import config from '../config';
import _ from 'lodash';

const actions = {
  error: err => ({
    type: types.ERROR,
    err,
  }),
  getProducts: products => ({
    type: types.GET_PRODUCTS,
    products,
  }),
  getCart: cart => ({
    type: types.GET_CART,
    cart,
  }),
  addProductToCart: productId => ({
    type: types.ADD_PRODUCT_TO_CART,
    productId,
  }),
  saveCart: () => ({
    type: types.SAVE_CART,
  }),
  checkout: () => ({
    type: types.CHECKOUT,
  }),
};

export const addProductToCart = productId => dispatch => {
  dispatch(actions.addProductToCart(productId));
};

export const getProducts = () => dispatch => {
  fetch(`${config.apiEndpoint}/products`)
    .then(res => res.json())
    .then(res => {
      dispatch(actions.getProducts(_.keyBy(res.products, 'id')))
    })
    .catch(err => {
      dispatch(actions.error(err));
    });
};

export const getCart = email => dispatch => {
  fetch(`${config.apiEndpoint}/cart/${email}`)
    .then(res => res.json())
    .then(res => {
      dispatch(actions.getCart(res));
    })
    .catch(err => {
      dispatch(actions.error(err));
    });
};

export const saveCart = (cart, email) => dispatch => {
  fetch(`${config.apiEndpoint}/cart/${email}`, {
    method: 'POST',
	  headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(cart),
  })
    .then(res => {
      dispatch(actions.saveCart());
    })
    .catch(err => {
      dispatch(actions.error(err));
    });
};

export const checkout = (cart, email) => dispatch => {
  fetch(`${config.apiEndpoint}/checkout/${email}`, {
    method: 'POST',
    body: {
      cart,
    },
  })
    .then(res => {
      dispatch(actions.checkout());
    })
    .catch(err => {
      dispatch(actions.error(err));
    });
};
