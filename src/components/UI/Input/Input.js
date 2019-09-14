import React from 'react';
import { Wrapper, AffixWrapper, InputEle } from './styled';

const Input = ({ suffix, prefix, wrapperProps, ...props }) => {
  return (
    <Wrapper {...wrapperProps}>
      {prefix && <AffixWrapper left>{prefix}</AffixWrapper>}
      <InputEle suffix={suffix} prefix={prefix} {...props} />
      {suffix && <AffixWrapper right>{suffix}</AffixWrapper>}
    </Wrapper>
  );
};

Input.defaultProps = {
  wrapperProps: {},
};

export default Input;
