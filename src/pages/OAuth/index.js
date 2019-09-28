import React from 'react';
import { Redirect } from 'react-router-dom';

import tokenService from 'Services/token';

const OAuth = ({ match }) => {
  const { params } = match;
  const { token } = params;

  if (token) {
    tokenService.set(token);
  }

  return <Redirect to="/" />;
};

export default OAuth;
