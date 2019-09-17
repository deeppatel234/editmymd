import React from 'react';

import { Button } from 'Components/UI';

import { FooterWrapper } from './styled';

const ModalFooter = ({ onClose, okText, okProps, cancelText, cancelProps }) => {
  return (
    <FooterWrapper>
      <Button color="primary" {...okProps}>
        {okText}
      </Button>
      <Button onClick={onClose} {...cancelProps}>
        {cancelText}
      </Button>
    </FooterWrapper>
  );
};

ModalFooter.defaultProps = {
  okText: 'Okay',
  cancelText: 'Cancel',
};

export default ModalFooter;
