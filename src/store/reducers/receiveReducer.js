import {
  SET_RECEIVE_CART,
  SET_RECEIVE_SUPPLIER,
  SET_RECEIVE_PAYMENT_METHOD,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  cartItems: [],
  paymentMethod: 'cash',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RECEIVE_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_RECEIVE_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case SET_RECEIVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
