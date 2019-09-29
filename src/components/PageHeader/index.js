import React from 'react';

import Breadcrumbs from 'Components/Breadcrumbs';
import { Typography } from 'Components/UI';
import { PageHeaderWrapper, HeaderButtons, PageTitle } from './styled';

const PageHeader = ({ title, titleComponent, children, breadcrumbs }) => {
  return (
    <PageHeaderWrapper>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
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
