import React, { useState, useEffect } from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github-gist.css';

import ContentLoader from 'react-content-loader';
import MediaQuery from 'Components/MediaQuery';
import PageHeader from 'Components/PageHeader';
import DiffView from 'Components/DiffView';
import CommitModal from 'Components/CommitModal';
import {
  Button,
  DiffIcon,
  MarkDownIcon,
  CommitIcon,
  MenuDropdown,
} from 'Components/UI';

import Request from 'Services';

import { EditorWrapper, LoaderWrapper } from './styled';

const Header = ({
  path,
  isDiffView,
  setIsDiffView,
  onCommitClick,
  isLoading,
}) => (
  <PageHeader title={path}>
    {!isLoading && (
      <>
        <MediaQuery lessThan="sm">
          <MenuDropdown
            menuItems={[
              {
                label: isDiffView ? 'Editor View' : 'Diff View',
                icon: isDiffView ? (
                  <MarkDownIcon width="1.5em" height="1.5em" />
                ) : (
                  <DiffIcon width="1.3em" height="1.3em" />
                ),
                props: {
                  onClick: () => setIsDiffView(!isDiffView),
                },
              },
              {
                label: 'Commit',
                icon: <CommitIcon width="1.5em" height="1.5em" />,
                props: {
                  onClick: onCommitClick,
                },
              },
            ]}
          />
        </MediaQuery>
        <MediaQuery greaterThan="sm">
          <PageHeader.Buttons>
            <Button
              color="primary"
              icon={
                isDiffView ? (
                  <MarkDownIcon width="1.5em" height="1.5em" />
                ) : (
                  <DiffIcon width="1.3em" height="1.3em" />
                )
              }
              onClick={() => setIsDiffView(!isDiffView)}
            >
              {isDiffView ? 'Editor View' : 'Diff View'}
            </Button>
            <Button
              color="primary"
              icon={<CommitIcon width="1.5em" height="1.5em" />}
              onClick={onCommitClick}
            >
              Commit
            </Button>
          </PageHeader.Buttons>
        </MediaQuery>
      </>
    )}
  </PageHeader>
);

const EditorPage = ({ history, location }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [masterContent, setMasterContent] = useState('');
  const [isDiffView, setIsDiffView] = useState(false);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [fileData, setFileData] = useState({});
  const { branch, path, repo, repoId, isNewFile } = location.state;

  useEffect(() => {
    if (!isNewFile) {
      Request.apiGet({
        url: '/file',
        params: {
          branch,
          path,
          repoId,
        },
      }).then(({ content: fileContent, ...restFileData }) => {
        setMasterContent(fileContent);
        setContent(fileContent);
        setFileData(restFileData);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const onChangeDiffView = diffViewValue => {
    setContent(diffViewValue);
  };

  const onChangeEditorValue = editorValue => {
    setContent(editorValue);
  };

  const onCommitClick = () => {
    setShowCommitModal(true);
  };

  const onCloseCommitModal = () => {
    setShowCommitModal(false);
  };

  const onCommit = ({ content: commitFileContent }) => {
    setMasterContent(content);
    setFileData(commitFileContent);
    if (isNewFile) {
      history.replace({
        ...location,
        state: { ...location.state, isNewFile: false },
      });
    }
  };

  return (
    <>
      <Header
        path={path}
        isDiffView={isDiffView}
        setIsDiffView={setIsDiffView}
        onCommitClick={onCommitClick}
        isLoading={isLoading}
      />
      <CommitModal
        onClose={onCloseCommitModal}
        visible={showCommitModal}
        branch={branch}
        path={path}
        repoId={repoId}
        repo={repo}
        content={content}
        sha={fileData.sha}
        onCommit={onCommit}
        isNewFile={isNewFile}
      />
      {isLoading ? (
        <LoaderWrapper>
          <ContentLoader width={20} height={100}>
            <rect x="0" y="0" rx="0" ry="0" width="20" height="100" />
          </ContentLoader>
          <ContentLoader width={20} height={100}>
            <rect x="0" y="0" rx="0" ry="0" width="20" height="100" />
          </ContentLoader>
        </LoaderWrapper>
      ) : (
        <EditorWrapper>
          {isDiffView ? (
            <DiffView
              value={content}
              originalValue={masterContent}
              onChange={onChangeDiffView}
            />
          ) : (
            <MDEditor
              defaultValue={content}
              onChange={onChangeEditorValue}
              parserOptions={{
                breaks: false,
                highlight: code => hljs.highlightAuto(code).value,
              }}
            />
          )}
        </EditorWrapper>
      )}
    </>
  );
};

export default EditorPage;
