import React from 'react';
import { InputEle } from './styled';

const TextArea = props => {
  return <InputEle {...props} as="textarea" />;
};

export default TextArea;
