import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _range from 'lodash/range';

import Empty from 'Components/Empty';
import PageHeader from 'Components/PageHeader';
import CreateFileModal from 'Components/CreateFileModal';
import BranchModal from 'Components/BranchModal';
import { CardLoader } from 'Components/ContentLoader';
import MediaQuery from 'Components/MediaQuery';
import withLocationState from 'Components/withLocationState';
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

const Header = ({
  branch,
  repository,
  onClickSelectBranch,
  onCreateFileClick,
}) => (
  <PageHeader
    titleComponent={
      <>
        <Typography variant="h6" center>
          <RepositoryIcon /> {repository.name}
        </Typography>
        <Typography center>
          <BranchIcon /> {branch}
        </Typography>
      </>
    }
    breadcrumbs={[{ label: 'Home', url: '/' }, { label: repository.name }]}
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

const RenderPaths = ({ isLoading, paths, editorState }) => (
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
                  state: editorState({ path, isNewFile: false }),
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
);

const RepoDetails = ({ history, locationState }) => {
  const [paths, setPaths] = useState([]);
  const [branch, setBranch] = useState(locationState.branch);
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
          repoId: locationState.repoId,
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

  const editorState = state => {
    return {
      ...locationState,
      ...state,
      branch,
    };
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
    history.push(
      '/editor',
      editorState({
        path: fileName,
        isNewFile: true,
      }),
    );
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
        branch={branch}
        repository={locationState}
        onClickSelectBranch={onClickSelectBranch}
        onCreateFileClick={onCreateFileClick}
      />
      <CreateFileModal
        onClose={onCloseCreateFileModal}
        visible={showCreateFileModal}
        onFileCreate={onFileCreate}
        repository={locationState}
      />
      <BranchModal
        onClose={onCloseBranchModal}
        visible={showBranchModal}
        repoId={locationState.repoId}
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
          <RenderPaths
            isLoading={isLoading}
            paths={paths}
            editorState={editorState}
          />
        </>
      )}
    </>
  );
};

export default withLocationState(RepoDetails);
