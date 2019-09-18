import React, { useState, useEffect } from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github-gist.css';

import PageHeader from 'Components/PageHeader';
import DiffView from 'Components/DiffView';
import CommitModal from 'Components/CommitModal';
import { Button, DiffIcon, MarkDownIcon, CommitIcon } from 'Components/UI';

import Request from 'Services';

import { EditorWrapper } from './styled';

const EditorPage = ({ history, location }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [masterContent, setMasterContent] = useState('');
  const [isDiffView, setIsDiffView] = useState(false);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [fileData, setFileData] = useState({});
  const { branch, path, repo, isNewFile } = location.state;

  useEffect(() => {
    if (!isNewFile) {
      Request.apiGet({
        url: '/file',
        params: {
          branch,
          path,
          repo,
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

  if (isLoading) {
    return null;
  }

  return (
    <>
      <PageHeader title={path}>
        <PageHeader.Buttons>
          <Button color="primary" onClick={() => setIsDiffView(!isDiffView)}>
            {isDiffView ? (
              <>
                <MarkDownIcon width="1.5em" height="1.5em" /> Editor View
              </>
            ) : (
              <>
                <DiffIcon width="1.3em" height="1.3em" /> Diff View
              </>
            )}
          </Button>
          <Button color="primary" onClick={onCommitClick}>
            <CommitIcon width="1.5em" height="1.5em" /> Commit
          </Button>
        </PageHeader.Buttons>
      </PageHeader>
      <CommitModal
        onClose={onCloseCommitModal}
        visible={showCommitModal}
        branch={branch}
        path={path}
        repo={repo}
        content={content}
        sha={fileData.sha}
        onCommit={onCommit}
      />
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
    </>
  );
};

export default EditorPage;
