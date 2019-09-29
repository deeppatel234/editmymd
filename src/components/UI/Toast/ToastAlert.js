import React from 'react';
import PropTypes from 'prop-types';

import { Toast, Remove } from './styled';

const ToastAlert = ({ content, options: { id, type }, onClickRemove }) => (
  <Toast type={type}>
    <span>{content}</span>
    <Remove data-toast-id={id} onClick={onClickRemove} />
  </Toast>
);

ToastAlert.defaultProps = {
  content: 'Success',
  onClickRemove: () => {},
};

ToastAlert.propTypes = {
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  options: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClickRemove: PropTypes.func,
};

export default React.memo(ToastAlert);
