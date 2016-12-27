// TODO: Split reducers.
import * as types from '../constants/ActionTypes'

const defaultState = {
  products: {},
  cart: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.ERROR:
      console.error(action.err);
      return state;
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case types.GET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case types.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.productId]: (state.cart[action.productId] || 0) + 1,
        },
      };
    case types.CHECKOUT:
      return {
        ...state,
        cart: defaultState.cart,
      };
    default:
      return state;
  };
};

export default reducer;
