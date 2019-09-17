import React from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from 'Components/UI';

import { HeaderWrapper } from './styled';

const ModalHeader = ({ onClose, component, closable }) => {
  return (
    <HeaderWrapper>
      {component}
      {closable && (
        <CloseIcon
          className="close-btn"
          width="1.3em"
          height="1.3em"
          onClick={onClose}
        />
      )}
    </HeaderWrapper>
  );
};

ModalHeader.defaultProps = {
  onClose: false,
  closable: true,
};

ModalHeader.propTypes = {
  onClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  closable: PropTypes.bool,
};

export default ModalHeader;
