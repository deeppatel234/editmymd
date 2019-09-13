import * as types from './types';

export const setUserData = user => dispatch => {
  return dispatch({
    type: types.USERS_SET,
    user,
  });
};

export const unsetUserData = () => dispatch => {
  return dispatch({
    type: types.USERS_UNSET,
  });
};
