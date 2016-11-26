import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addProductToCart } from '../actions'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

const ProductsContainer = ({ products, addProductToCart }) => (
  <ProductsList title="Products">
    {Object.keys(products).map(productId =>
      <ProductItem
        key={productId}
        product={products[productId]}
        onAddToCartClicked={() => addProductToCart(productId)} />
    )}
  </ProductsList>
)

ProductsContainer.propTypes = {
  products: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  products: state.products,
})

export default connect(
  mapStateToProps,
  { addProductToCart }
)(ProductsContainer)
