import * as ACTION_TYPES from '../actions/actionTypes';

const INITIAL_STATE = {
  allStockList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_STOCK_LIST:
      return {
        ...state,
        allStockList: action.payload,
      };

    default: {
      return state;
    }
  }
};
