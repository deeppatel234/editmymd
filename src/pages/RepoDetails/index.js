import React, { useState, useEffect } from 'react';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import { RepositoryIcon, BookIcon, FileIcon, Typography } from 'Components/UI';

import Request from 'Services';

import { PathListWrapper, PathList, PathListChild } from './styled';

const RepoDetails = ({ match }) => {
  const [paths, setPaths] = useState([]);
  const { repository } = match.params;

  useEffect(() => {
    Request.apiGet({
      url: '/branch/tree',
      params: {
        branch: 'master',
        repo: repository,
      },
    }).then(path => setPaths(path));
  }, []);

  return (
    <>
      <PageHeader
        title={
          <>
            <RepositoryIcon /> {repository}
          </>
        }
      />
      {!paths.length && (
        <Empty message="No READMD Files Found">
          <BookIcon height="50" width="50" color="subText" />
        </Empty>
      )}
      <PathListWrapper>
        <PathList>
          {paths.map(({ path }) => {
            return (
              <PathListChild key={path}>
                <Typography>
                  <FileIcon height="1.5em" width="1.5em" />
                  {path}
                </Typography>
              </PathListChild>
            );
          })}
        </PathList>
      </PathListWrapper>
    </>
  );
};

export default RepoDetails;
