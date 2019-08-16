import React from 'react';
import { Redirect } from 'react-router-dom';

import service from 'Services';

const URL = `https://github.com/login/oauth/authorize?client_id=c89dd5f13749cb45b154&scope=user%20repo`;

const LoginPage = () => {
  if (service.getToken()) {
    return <Redirect to="/app" />;
  }
  return <a href={URL}>Login</a>;
};

export default LoginPage;
