import React from 'react';
import ContentLoader from 'react-content-loader';

const BaseLoader = ({ children, ...props }) => (
  <ContentLoader
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    {children}
  </ContentLoader>
);

export const CardLoader = props => (
  <BaseLoader height={65} {...props}>
    <rect x="0" y="0" rx="4" ry="4" width="400" height="65" />
  </BaseLoader>
);

export default BaseLoader;
