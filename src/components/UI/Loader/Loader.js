import React from 'react';
import PropTypes from 'prop-types';

import { BarLoader, CircleLoader } from '../Icons';

const LOADER_TYPE = {
  bar: BarLoader,
  circle: CircleLoader,
};

const Loader = ({ type, size, ...restProps }) => {
  const LoaderTypeComponent = LOADER_TYPE[type];
  return <LoaderTypeComponent width={size} {...restProps} />;
};

Loader.defaultProps = {
  type: 'circle',
  size: 40,
};

Loader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Loader;
