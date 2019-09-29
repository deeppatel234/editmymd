import React, { useEffect, useState } from 'react';

import { OfflineIcon } from 'Components/UI';

import { OfflineBarWrapper } from './styled';

const OfflineBar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const onChangeNetwork = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', onChangeNetwork);
    window.addEventListener('offline', onChangeNetwork);

    return () => {
      window.removeEventListener('online', onChangeNetwork);
      window.removeEventListener('offline', onChangeNetwork);
    };
  });

  if (isOnline) {
    return null;
  }

  return (
    <OfflineBarWrapper>
      <OfflineIcon height="1.3em" width="1.3em" />
      You are browsing in offline mode
    </OfflineBarWrapper>
  );
};

export default OfflineBar;
