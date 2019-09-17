import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import ModalComponent from './ModalComponent';

const modalRoot = document.getElementById('portal') || document.body;

const Modal = ({ visible, ...rest }) => {
  const [unMounted, setUnMounted] = useState(true);
  const eleRef = useRef(document.createElement('div'));

  useEffect(() => {
    modalRoot.appendChild(eleRef.current);
    return () => {
      modalRoot.removeChild(eleRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setUnMounted(false);
    }
  }, [visible]);

  if (unMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalComponent setUnMounted={setUnMounted} visible={visible} {...rest} />,
    eleRef.current,
  );
};

export default Modal;
