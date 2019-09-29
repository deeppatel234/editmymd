import React from 'react';

import { Typography } from 'Components/UI';
import { PageHeaderWrapper, HeaderButtons, PageTitle } from './styled';

const PageHeader = ({ title, titleComponent, children }) => {
  return (
    <PageHeaderWrapper>
      <PageTitle>
        {title && (
          <Typography center variant="h5">
            {title}
          </Typography>
        )}
        {titleComponent}
      </PageTitle>
      {children}
    </PageHeaderWrapper>
  );
};

PageHeader.Buttons = HeaderButtons;

export default PageHeader;
