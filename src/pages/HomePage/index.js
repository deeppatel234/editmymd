import React, { useEffect } from 'react';

import service from 'Services';

const HomePage = () => {
  useEffect(() => {
    service.api({
      url: '/user'
    }).then((res) => {
      console.log(res);
    })
  }, []);

  return <div>Homepage</div>;
};

export default HomePage;
