import React from 'react';

import { Typography } from 'Components/UI';
import { PageHeaderWrapper, HeaderButtons } from './styled';

const PageHeader = ({ title, children }) => {
  return (
    <PageHeaderWrapper>
      <Typography variant="h5">{title}</Typography>
      {children}
    </PageHeaderWrapper>
  );
};

PageHeader.Buttons = HeaderButtons;

export default PageHeader;
