import React, { useState, useEffect } from 'react';

import { Typography, CloseIcon } from 'Components/UI';

import { pwaPrompt } from 'Utilities/serviceWorker';

import { PWAPromptWrapper } from './styled';

const PWAPrompt = () => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }, []);

  const onCloseClick = () => {
    setVisible(false);
    localStorage.setItem('pp', false);
  };

  const onAddClick = () => {
    pwaPrompt
      .showPrompt()
      .then(onCloseClick)
      .catch(onCloseClick);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <PWAPromptWrapper>
      <Typography variant="body2" weight="bold" onClick={onAddClick}>
        Add ReadMD to Home Screen
      </Typography>
      <span tabIndex="0" role="button" onClick={onCloseClick}>
        <CloseIcon height="2em" weight="2em" />
      </span>
    </PWAPromptWrapper>
  );
};

export default () => {
  return localStorage.getItem('pp') !== 'false' ? <PWAPrompt /> : null;
};
