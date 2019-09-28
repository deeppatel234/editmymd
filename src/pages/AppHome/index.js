import React, { useState, useEffect } from 'react';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import useDebounce from 'Components/useDebounce';
import { Input, RepositoryIcon, SearchIcon, ErrorIcon } from 'Components/UI';

import api from 'Services/api';

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
  const [error, setError] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    api
      .get({
        url: '/repo',
      })
      .then(repo => {
        setRepoList(repo);
        setInitRepoList(repo);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Unable to fetch repository');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      api
        .get({
          url: '/repo/search',
          params: { query: debouncedSearchTerm },
        })
        .then(repo => {
          setRepoList(repo);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Unable to search repository');
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
            aria-label="search"
            prefix={<SearchIcon />}
            wrapperProps={{ className: 'search-input' }}
            placeholder="Search Repository"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputWrapper>
        {error ? (
          <Empty message={error}>
            <ErrorIcon height="150" width="150" />
          </Empty>
        ) : (
          <>
            {!isLoading && !repoList.length && (
              <Empty message="No Repository Found">
                <RepositoryIcon height="50" width="50" color="subText" />
              </Empty>
            )}
            <RepositoryCardWrapper>
              {isLoading ? (
                <RepositoryCard.Loader />
              ) : (
                repoList.map(repo => <RepositoryCard key={repo.id} {...repo} />)
              )}
            </RepositoryCardWrapper>
          </>
        )}
      </AddRepositoryWrapper>
    </>
  );
};

export default AppHome;
