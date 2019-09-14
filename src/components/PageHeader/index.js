import React from 'react';

import { Typography } from 'Components/UI';
import { PageHeaderWrapper } from './styled';

const PageHeader = ({ title, children }) => {
  return (
    <PageHeaderWrapper>
      <Typography variant="h5">{title}</Typography>
      {children}
    </PageHeaderWrapper>
  );
}

export default PageHeader;
