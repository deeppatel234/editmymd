import React, { useState, useEffect } from 'react';
import _range from 'lodash/range';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import useDebounce from 'Components/useDebounce';
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
  const [initRepoList, setInitRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    Request.apiGet({
      url: '/repo',
    }).then(repo => {
      setRepoList(repo);
      setInitRepoList(repo);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      Request.apiGet({
        url: '/repo/search',
        params: { query: debouncedSearchTerm },
      }).then(repo => {
        setRepoList(repo);
        setIsLoading(false);
      });
    } else {
      setRepoList(initRepoList);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <PageHeader
        title={
          <>
            <RepositoryIcon /> Repository
          </>
        }
      />
      <AddRepositoryWrapper>
        <InputWrapper>
          <Input
            wrapperProps={{ className: 'search-input' }}
            placeholder="Search Repository"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputWrapper>
        {!isLoading && !repoList.length && (
          <Empty message="No Repository Found">
            <RepositoryIcon height="50" width="50" color="subText" />
          </Empty>
        )}
        <RepositoryCardWrapper>
          {isLoading
            ? _range(6).map(() => <RepositoryCard.Loader />)
            : repoList.map(repo => <RepositoryCard key={repo.id} {...repo} />)}
        </RepositoryCardWrapper>
      </AddRepositoryWrapper>
    </>
  );
};

export default AppHome;
