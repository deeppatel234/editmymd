import { combineReducers } from 'redux';

import userReducer, { types } from './user';

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.USERS_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
