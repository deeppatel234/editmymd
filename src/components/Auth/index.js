import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Request from 'Services';
import { actions } from 'State/user';

const Auth = ({ fallback: FallBack, children, setUserData }) => {
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
          setUserData(res);
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

export default connect(
  null,
  {
    setUserData: actions.setUserData,
  },
)(Auth);
