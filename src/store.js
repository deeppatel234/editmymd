/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './state';

const PROD = NODE_ENV === 'production';
const middlewares = [thunk];

if (!PROD) {
  const logger = require('redux-logger');
  middlewares.push(logger.createLogger());
}

const composeEnhancers =
  (!PROD && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {
  user: null,
};

/** create store */
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

/** export store as default */
export default store;
