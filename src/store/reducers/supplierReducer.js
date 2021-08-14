import * as ACTION_TYPES from '../actions/actionTypes';

const INITIAL_STATE = {
  allSupplierList: [],
  supplierList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_SUPPLIER_LIST:
      return {
        ...state,
        allSupplierList: action.payload,
      };

    case ACTION_TYPES.SET_SUPPLIER_LIST:
      return {
        ...state,
        supplierList: action.payload,
      };

    default:
      return state;
  }
};
