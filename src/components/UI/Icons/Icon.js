import React from 'react';
import PropTypes from 'prop-types';

import { IconSvg } from './styled';

const Icon = ({ children, ...props }) => (
  <IconSvg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    {children}
  </IconSvg>
);

Icon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Icon.defaultProps = {
  fill: 'currentColor',
  width: '1em',
  height: '1em',
};

export default Icon;
