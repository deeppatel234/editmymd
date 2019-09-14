import React from 'react';

import { Typography } from 'Components/UI';
import { EmptyElement, IconWrapper } from './styled';

const Empty = ({
  variant,
  color,
  message,
  children,
  messageProps,
  ...restProps
}) => (
  <EmptyElement {...restProps}>
    {children && <IconWrapper>{children}</IconWrapper>}
    <Typography variant="h6" color="lightText" {...messageProps}>
      {message}
    </Typography>
  </EmptyElement>
);

export default Empty;
