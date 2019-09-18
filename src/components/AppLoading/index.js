import React from 'react';

import Empty from 'Components/Empty';
import { Loader } from 'Components/UI';

const AppLoading = () => (
  <Empty>
    <Loader height="50" width="50" type="bar" />
  </Empty>
);

export default AppLoading;
