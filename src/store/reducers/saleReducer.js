import {
  SET_SALE_CART,
  SET_SALE_CUSTOMER,
  SET_SALE_PAYMENT_METHOD,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  cartItems: [],
  paymentMethod: 'cash',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SALE_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_SALE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case SET_SALE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
