import React from 'react';

import { Typography } from 'Components/UI';
import { BreadcrumbWrapper, BreadcrumbLink, Separator } from './styled';

const Breadcrumb = ({ items }) => {
  return (
    <BreadcrumbWrapper>
      {items.map(({ label, url, state = {} }, index) => {
        return (
          <React.Fragment key={label}>
            {url ? (
              <BreadcrumbLink
                to={{
                  pathname: url,
                  state,
                }}
              >
                {label}
              </BreadcrumbLink>
            ) : (
              <Typography color="subText" element="span">
                {label}
              </Typography>
            )}
            {index !== items.length - 1 && <Separator />}
          </React.Fragment>
        );
      })}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
