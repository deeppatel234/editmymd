import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import AppLoading from 'Components/AppLoading';
import token from 'Services/token';
import api from 'Services/api';
import { actions } from 'State/user';

const Auth = ({ fallback: FallBack, children, setUserData }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const failAuth = () => {
    setAuthenticated(false);
    setLoading(false);
  };

  useEffect(() => {
    if (token.get()) {
      api.get({
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
    return <AppLoading />;
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
