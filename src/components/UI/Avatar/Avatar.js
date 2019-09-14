import React from 'react';
import PropTypes from 'prop-types';

import { AvatarImage } from './styled';

const Avatar = ({ image, ...restProps }) => (
  <AvatarImage src={image} {...restProps} />
);

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 30,
};

export default Avatar;
