import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkout, getCart, saveCart } from '../actions'
import Cart from '../components/Cart'

const CartContainer = ({ products, cart, checkout, getCart, saveCart }) => (
  <Cart
    products={products}
    cart={cart}
    onLoadClicked={(email) => getCart(email)}
    onSaveClicked={(email) => saveCart(cart, email)}
    onCheckoutClicked={(email) => checkout(cart, email)}
  />
)

CartContainer.propTypes = {
  products: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  checkout: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
})

export default connect(
  mapStateToProps,
  { checkout, getCart, saveCart }
)(CartContainer)
