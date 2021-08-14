import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import logger from 'redux-logger';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'eit-pos-store',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, multi, logger))
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
