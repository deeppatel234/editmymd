import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _range from 'lodash/range';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import CreateFileModal from 'Components/CreateFileModal';
import BranchModal from 'Components/BranchModal';
import { CardLoader } from 'Components/ContentLoader';
import {
  RepositoryIcon,
  Button,
  BookIcon,
  FileIcon,
  MarkDownIcon,
  Typography,
  BranchIcon,
} from 'Components/UI';

import Request from 'Services';

import { RepoDetailsWrapper, PathList, PathListChild } from './styled';

const RepoDetails = ({ match, history, location }) => {
  const { repository } = match.params;
  const { defaultBranch } = location.state;
  const [paths, setPaths] = useState([]);
  const [branch, setBranch] = useState(defaultBranch);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFileTree = () => {
    setIsLoading(true);
    Request.apiGet({
      url: '/branch/tree',
      params: {
        branch,
        repo: repository,
      },
    }).then(path => {
      setPaths(path);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchFileTree();
  }, [branch]);

  const onCreateFileClick = () => {
    setShowCreateFileModal(true);
  };

  const onCloseCreateFileModal = () => {
    setShowCreateFileModal(false);
  };

  const onFileCreate = fileName => {
    onCloseCreateFileModal();
    history.push('/editor', {
      branch,
      path: fileName,
      repo: repository,
      isNewFile: true,
    });
  };

  const onClickSelectBranch = () => {
    setShowBranchModal(true);
  };

  const onCloseBranchModal = () => {
    setShowBranchModal(false);
  };

  const onBranchSelect = branchName => {
    setBranch(branchName);
  };

  return (
    <>
      <PageHeader
        title={
          <>
            <RepositoryIcon /> {repository}
          </>
        }
      >
        <PageHeader.Buttons>
          <Button color="primary" onClick={onClickSelectBranch}>
            <BranchIcon height="1.3em" width="1.3em" />
            Change Branch
          </Button>
          <Button color="primary" onClick={onCreateFileClick}>
            <MarkDownIcon />
            Create New File
          </Button>
        </PageHeader.Buttons>
      </PageHeader>
      <CreateFileModal
        onClose={onCloseCreateFileModal}
        visible={showCreateFileModal}
        repo={repository}
        onFileCreate={onFileCreate}
      />
      <BranchModal
        onClose={onCloseBranchModal}
        visible={showBranchModal}
        repo={repository}
        onBranchSelect={onBranchSelect}
      />
      {!isLoading && !paths.length && (
        <Empty message="No Markdown Files Found">
          <BookIcon height="50" width="50" color="subText" />
        </Empty>
      )}
      <RepoDetailsWrapper>
        <PathList>
          {isLoading
            ? _range(6).map(id => (
                <PathListChild key={id}>
                  <CardLoader height={20} />
                </PathListChild>
              ))
            : paths.map(({ path }) => (
                <PathListChild key={path}>
                  <Link
                    to={{
                      pathname: '/editor',
                      state: {
                        branch,
                        path,
                        repo: repository,
                        isNewFile: false,
                      },
                    }}
                  >
                    <Typography>
                      <FileIcon height="1.5em" width="1.5em" />
                      {path}
                    </Typography>
                  </Link>
                </PathListChild>
              ))}
        </PathList>
      </RepoDetailsWrapper>
    </>
  );
};

export default RepoDetails;
