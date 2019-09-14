import React, { useState } from 'react';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import {
  Button,
  Input,
  RepositoryIcon,
  AddRepositoryIcon,
} from 'Components/UI';

import { AddRepositoryWrapper, InputWrapper } from './styled';

const AddRepository = () => {
  const [repoList, setRepoList] = useState([]);

  return (
    <>
      <PageHeader title="Repositories">
        <Button color="primary">
          <AddRepositoryIcon />
          Add
        </Button>
      </PageHeader>
      <AddRepositoryWrapper>
        <InputWrapper>
          <Input
            wrapperProps={{ className: 'search-input' }}
            placeholder="Search Repository"
          />
        </InputWrapper>
        {!repoList.length && (
          <Empty message="No Repository Found">
            <RepositoryIcon height="50" width="50" color="subText" />
          </Empty>
        )}
      </AddRepositoryWrapper>
    </>
  );
};

export default AddRepository;
