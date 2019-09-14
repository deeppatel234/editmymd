import React, { useState, useEffect } from 'react';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import { Input, RepositoryIcon } from 'Components/UI';

import Request from 'Services';

import RepositoryCard from './RepositoryCard';

import {
  AddRepositoryWrapper,
  InputWrapper,
  RepositoryCardWrapper,
} from './styled';

const AppHome = () => {
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    Request.apiGet({
      url: '/repo',
    }).then(repo => setRepoList(repo));
  }, []);

  return (
    <>
      <PageHeader title="Repositories" />
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
        <RepositoryCardWrapper>
          {repoList.map(repo => (
            <RepositoryCard key={repo.id} {...repo} />
          ))}
        </RepositoryCardWrapper>
      </AddRepositoryWrapper>
    </>
  );
};

export default AppHome;
