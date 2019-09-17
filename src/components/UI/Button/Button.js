import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../Loader';
import { ButtonElement } from './styled';

const Button = ({ children, loading, disabled, ...restProps }) => (
  <ButtonElement {...restProps} disabled={loading || disabled}>
    {loading && <Loader height="1.5em" width="1.5em" />}
    {children}
  </ButtonElement>
);

Button.defaultProps = {
  color: '',
  outline: false,
  block: false,
  loading: false,
};

Button.propTypes = {
  color: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
