import React, { PropTypes } from 'react'
import Product from './Product'

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { email: '' };
    this.setEmail = this.setEmail.bind(this);
  }
  setEmail(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    const { products, cart, onLoadClicked, onSaveClicked, onCheckoutClicked } = this.props;
    const emptyCart = Object.keys(cart).length === 0
    let total = 0;
    const nodes = !emptyCart ? (
      Object.keys(cart).map(productId => {
        total += products[productId].price * cart[productId];
        return (<Product
          title={products[productId].title}
          price={products[productId].price}
          quantity={cart[productId]}
          key={productId}
        />);
      })
    ) : (
      <em>Please add some products to cart.</em>
    )

    return (
      <div>
        <h3>Your Cart</h3>
        <div>{nodes}</div>
        <p>Total: &#36;{Math.ceil(total * 100) / 100}</p>
        <input type="text" name="email" value={this.state.email} onChange={this.setEmail} />
        <button onClick={() => onLoadClicked(this.state.email)}
          disabled={this.state.email ? '' : 'disabled'}>
          Load
        </button>
        <button onClick={() => onSaveClicked(this.state.email)}
          disabled={!emptyCart && this.state.email ? '' : 'disabled'}>
          Save
        </button>
        <button onClick={() => onCheckoutClicked(this.state.email)}
          disabled={!emptyCart ? '' : 'disabled'}>
          Checkout
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  onLoadClicked: PropTypes.func.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
  onCheckoutClicked: PropTypes.func.isRequired,
}

export default Cart
