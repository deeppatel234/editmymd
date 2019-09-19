import React from 'react';
import ContentLoader from 'react-content-loader';

export default ({ children, ...props }) => (
  <ContentLoader
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    {children}
  </ContentLoader>
);
