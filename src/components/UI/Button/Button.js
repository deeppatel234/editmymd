import React from 'react';
import PropTypes from 'prop-types';

// import { Loader } from '../Loader';
import { ButtonElement, LoaderWrapper } from './styled';

const Button = ({ children, loading, ...restProps }) => (
  <ButtonElement {...restProps}>
    {/* {loading && (
      <LoaderWrapper data-testid="loading">
        <Loader type="circle" size="1.5em" />
      </LoaderWrapper>
    )} */}
    {children}
  </ButtonElement>
);

Button.defaultProps = {
  variant: 'body',
  color: 'primary',
  outline: false,
  block: false,
  loading: false,
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
