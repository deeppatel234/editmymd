import React from 'react';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import { Button, RepositoryIcon } from 'Components/UI';

const AppHome = () => {
  return (
    <>
      <PageHeader title="Your Repository">
        <Button color="primary">Add Repository</Button>
      </PageHeader>
      <Empty message="Add your first repository">
        <RepositoryIcon height="50" width="50" color="subText" />
      </Empty>
    </>
  );
};

export default AppHome;
