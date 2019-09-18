import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import CreateFileModal from 'Components/CreateFileModal';
import {
  RepositoryIcon,
  Button,
  BookIcon,
  FileIcon,
  MarkDownIcon,
  Typography,
} from 'Components/UI';

import Request from 'Services';

import {
  RepoDetailsWrapper,
  PathList,
  PathListChild,
  RepoControl,
} from './styled';

const RepoDetails = ({ match, history }) => {
  const [paths, setPaths] = useState([]);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const { repository } = match.params;
  const branch = 'master';

  useEffect(() => {
    Request.apiGet({
      url: '/branch/tree',
      params: {
        branch: 'master',
        repo: repository,
      },
    }).then(path => setPaths(path));
  }, []);

  const onCreateFileClick = () => {
    setShowCreateFileModal(true);
  };

  const onCloseCreateFileModal = () => {
    setShowCreateFileModal(false);
  };

  const onFileCreate = fileName => {
    console.log(fileName);
    onCloseCreateFileModal();
    history.push('/editor', {
      branch,
      path: fileName,
      repo: repository,
      isNewFile: true,
    });
  };

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
        <Empty message="No Markdown Files Found">
          <BookIcon height="50" width="50" color="subText" />
        </Empty>
      )}
      <CreateFileModal
        onClose={onCloseCreateFileModal}
        visible={showCreateFileModal}
        repo={repository}
        onFileCreate={onFileCreate}
      />
      <RepoDetailsWrapper>
        <RepoControl>
          <Button color="primary" onClick={onCreateFileClick}>
            <MarkDownIcon />
            Create New Markdown File
          </Button>
        </RepoControl>
        <PathList>
          {paths.map(({ path }) => {
            return (
              <PathListChild key={path}>
                <Link
                  to={{
                    pathname: '/editor',
                    state: { branch, path, repo: repository, isNewFile: false },
                  }}
                >
                  <Typography>
                    <FileIcon height="1.5em" width="1.5em" />
                    {path}
                  </Typography>
                </Link>
              </PathListChild>
            );
          })}
        </PathList>
      </RepoDetailsWrapper>
    </>
  );
};

export default RepoDetails;
