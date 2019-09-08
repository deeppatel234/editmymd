import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import service from 'Services';

const Auth = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const failAuth = () => {
    setAuthenticated(false);
    setLoading(false);
  };

  useEffect(() => {
    const token = service.getToken();
    if (token) {
      service.setToken(token);
      service
        .apiGet({
          url: '/user',
        })
        .then(res => {
          console.log(res);
          setAuthenticated(true);
          setLoading(false);
        })
        .catch(failAuth);
    } else {
      failAuth();
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Redirect to="/login" />;
};

export default Auth;
