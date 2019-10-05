import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'Components/UI';
import { Wrapper, ChildWrapper } from './styled';

const FormGroup = ({
  name,
  id,
  disabled,
  label,
  labelProps = {},
  error,
  labelTextPlacement,
  helpText,
  helpTextProps = {},
  children,
  required,
  block,
  ...restProps
}) => {
  const text = error || helpText;
  const status = error && 'error';
  return (
    <Wrapper
      disabled={disabled}
      required={required}
      labelTextPlacement={labelTextPlacement}
      block={block}
      {...restProps}
    >
      <Typography
        variant="label"
        htmlFor={id || name}
        className="form-label"
        display="block"
        {...labelProps}
      >
        {label}
      </Typography>
      <ChildWrapper block={block}>
        {children({
          id: id || name,
          name,
          disabled,
          error,
          status,
          required,
        })}
        {text && (
          <Typography
            variant="subText"
            className="form-help-text"
            color={status}
            {...helpTextProps}
          >
            {text}
          </Typography>
        )}
      </ChildWrapper>
    </Wrapper>
  );
};

FormGroup.defaultProps = {
  helpText: '',
  disabled: false,
  required: false,
  block: true,
  label: '',
  labelTextPlacement: 'top',
};

FormGroup.propTypes = {
  helpText: PropTypes.string,
  labelTextPlacement: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  block: PropTypes.bool,
};

export default FormGroup;
