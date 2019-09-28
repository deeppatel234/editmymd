import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _range from 'lodash/range';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import CreateFileModal from 'Components/CreateFileModal';
import BranchModal from 'Components/BranchModal';
import { CardLoader } from 'Components/ContentLoader';
import MediaQuery from 'Components/MediaQuery';
import {
  RepositoryIcon,
  Button,
  BookIcon,
  FileIcon,
  Typography,
  BranchIcon,
  MenuDropdown,
  ErrorIcon,
} from 'Components/UI';

import api from 'Services/api';

import { RepoDetailsWrapper, PathList, PathListChild } from './styled';

const Header = ({ repository, onClickSelectBranch, onCreateFileClick }) => (
  <PageHeader
    title={
      <>
        <RepositoryIcon /> {repository}
      </>
    }
  >
    <MediaQuery lessThan="sm">
      <MenuDropdown
        menuItems={[
          {
            label: 'Change Branch',
            icon: <BranchIcon height="1.3em" width="1.3em" />,
            props: {
              onClick: onClickSelectBranch,
            },
          },
          {
            label: 'Create New File',
            icon: <FileIcon height="1.3em" width="1.3em" />,
            props: {
              onClick: onCreateFileClick,
            },
          },
        ]}
      />
    </MediaQuery>
    <MediaQuery greaterThan="sm">
      <PageHeader.Buttons>
        <Button
          icon={<BranchIcon height="1.3em" width="1.3em" />}
          color="primary"
          onClick={onClickSelectBranch}
        >
          Change Branch
        </Button>
        <Button
          icon={<FileIcon height="1.3em" width="1.3em" />}
          color="primary"
          onClick={onCreateFileClick}
        >
          Create New File
        </Button>
      </PageHeader.Buttons>
    </MediaQuery>
  </PageHeader>
);

const RepoDetails = ({ match, history, location }) => {
  const { repository } = match.params;
  const { defaultBranch, repoId } = location.state;
  const [paths, setPaths] = useState([]);
  const [branch, setBranch] = useState(defaultBranch);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFileTree = () => {
    setIsLoading(true);
    api
      .get({
        url: '/branch/tree',
        params: {
          branch,
          repoId,
        },
      })
      .then(path => {
        setPaths(path);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Unable to fetch markdown files');
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
      repoId,
      repo: repository,
      path: fileName,
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
      <Header
        repository={repository}
        onClickSelectBranch={onClickSelectBranch}
        onCreateFileClick={onCreateFileClick}
      />
      <CreateFileModal
        onClose={onCloseCreateFileModal}
        visible={showCreateFileModal}
        repo={repository}
        onFileCreate={onFileCreate}
      />
      <BranchModal
        onClose={onCloseBranchModal}
        visible={showBranchModal}
        repoId={repoId}
        onBranchSelect={onBranchSelect}
      />
      {error ? (
        <Empty message={error}>
          <ErrorIcon height="150" width="150" />
        </Empty>
      ) : (
        <>
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
                            repoId,
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
      )}
    </>
  );
};

export default RepoDetails;
