import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import ModalHeader from './Header';
import ModalFooter from './Footer';

import { ModalWrapper, BodyWrapper, ModalBody } from './styled';

const ModalComponent = ({
  visible,
  children,
  onClose,
  maskClosable,
  header,
  footer,
  footerProps,
  headerProps,
  setUnMounted,
}) => {
  const onCloseModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  const onClickBody = useCallback(() => {
    if (maskClosable) {
      onCloseModal();
    }
  }, []);

  const onClickModalWrapper = useCallback(event => {
    event.stopPropagation();
  }, []);

  return (
    <CSSTransition in={visible} timeout={300} classNames="model-body-animation">
      <BodyWrapper onClick={onClickBody}>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="model-animation"
          onExited={() => setUnMounted(true)}
        >
          <ModalWrapper onClick={onClickModalWrapper}>
            {header && (
              <ModalHeader
                onClose={onCloseModal}
                component={header}
                {...headerProps}
              />
            )}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter onClose={onCloseModal} {...footerProps} />}
          </ModalWrapper>
        </CSSTransition>
      </BodyWrapper>
    </CSSTransition>
  );
};

ModalComponent.defaultProps = {
  visible: false,
  onClose: false,
  maskClosable: true,
  footer: true,
};

ModalComponent.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  maskClosable: PropTypes.bool,
  footer: PropTypes.bool,
};

export default ModalComponent;
