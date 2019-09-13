import * as types from './types';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.USERS_SET:
      return action.user;

    case types.USERS_UNSET:
      return null;

    default:
      return state;
  }
};

export default user;
