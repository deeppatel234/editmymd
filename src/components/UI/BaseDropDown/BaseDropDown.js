import React, { useState, useEffect } from 'react';

import { DropDownWrapper, DropDownArea } from './styled';

const BaseDropDown = ({
  children,
  position,
  dropDownProps,
  dropDownComponent,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClickDocument = event => {
    if (!event.target.closest('.dropdown')) {
      onChangeOpen();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', onClickDocument);
    } else {
      document.removeEventListener('click', onClickDocument);
    }
  }, [isOpen]);

  return (
    <DropDownWrapper className="dropdown" {...restProps}>
      {children({ onClick: onChangeOpen, isOpen })}
      <DropDownArea isOpen={isOpen} position={position} {...dropDownProps}>
        {dropDownComponent}
      </DropDownArea>
    </DropDownWrapper>
  );
};

BaseDropDown.defaultProps = {
  dropDownProps: {},
  position: 'right',
};

export default BaseDropDown;
