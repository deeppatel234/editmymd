import React from 'react';
import { Redirect } from 'react-router-dom';

import Request from 'Services';

const OAuth = ({ match }) => {
  const { params } = match;
  const { token } = params;

  if (token) {
    Request.setToken(token);
  }

  return <Redirect to="/" />;
};

export default OAuth;
