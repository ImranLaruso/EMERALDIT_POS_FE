import * as ACTION_TYPES from '../actions/actionTypes';

const INITIAL_STATE = {
  itemList: [],
  formattedItemList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };

    case ACTION_TYPES.SET_FORMATTED_ITEM_LIST:
      return {
        ...state,
        formattedItemList: action.payload,
      };

    default: {
      return state;
    }
  }
};
