import React, { useState, useEffect } from 'react';

import PageHeader from 'Components/PageHeader';
import { RepositoryIcon, BookIcon, FileIcon, Typography } from 'Components/UI';

import Request from 'Services';

import { PathListWrapper } from './styled';

const EditorPage = ({ location }) => {
  useEffect(() => {
    const { branch, path, repo } = location.state;
    Request.apiGet({
      url: '/file',
      params: {
        branch,
        path,
        repo,
      },
    });
  }, []);

  return (
    <>
      <PathListWrapper>hello</PathListWrapper>
    </>
  );
};

export default EditorPage;
