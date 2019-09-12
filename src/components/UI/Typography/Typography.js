import React from 'react';
import PropTypes from 'prop-types';

import { Element } from './styled';

const defaultElementMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

const DEFAULT_ELEMENT = 'p';

const Typography = ({ element, variant, ...props }) => (
  <Element
    as={element || defaultElementMapping[variant] || DEFAULT_ELEMENT}
    variant={variant}
    {...props}
  />
);

Typography.defaultProps = {
  variant: 'body',
  color: 'text',
  weight: '',
};

Typography.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Typography;
