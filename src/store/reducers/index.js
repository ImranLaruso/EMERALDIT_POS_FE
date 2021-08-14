import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import saleReducer from './saleReducer';
import receiveReducer from './receiveReducer';
import itemFilterReducer from './itemFilterReducer';
import supplierReducer from './supplierReducer';
import itemReducer from './itemReducer';
import brandReducer from './brandReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  global: globalReducer,
  auth: authReducer,
  sale: saleReducer,
  receive: receiveReducer,
  itemFilter: itemFilterReducer,
  supplier: supplierReducer,
  item: itemReducer,
  brand: brandReducer,
  stock: stockReducer,
});
