import React, { useState, useEffect } from 'react';

import Request from 'Services';

const Auth = ({ fallback: FallBack, children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const failAuth = () => {
    setAuthenticated(false);
    setLoading(false);
  };

  useEffect(() => {
    const token = Request.getToken();
    if (token) {
      Request.setToken(token);
      Request.apiGet({
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

  return <FallBack />;
};

export default Auth;
