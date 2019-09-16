import React, { useState, useEffect } from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github-gist.css';

import PageHeader from 'Components/PageHeader';
import DiffView from 'Components/DiffView';
import { Button, DiffIcon, MarkDownIcon, CommitIcon } from 'Components/UI';

import Request from 'Services';

import { EditorWrapper } from './styled';

const EditorPage = ({ location }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [masterContent, setMasterContent] = useState('');
  const [isDiffView, setIsDiffView] = useState(false);
  const [fileData, setFileData] = useState({});
  const { branch, path, repo } = location.state;

  useEffect(() => {
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
  }, []);

  const onChangeDiffView = diffViewValue => {
    setContent(diffViewValue);
  };

  const onChangeEditorValue = editorValue => {
    setContent(editorValue);
  };

  const onCommitClick = () => {
    Request.apiPut({
      url: '/file/commit',
      data: {
        branch,
        path,
        repo,
        message: 'this is test yahhhh',
        sha: fileData.sha,
        content,
      },
    }).then(({ content: updatedContent }) => {
      setFileData(updatedContent);
    });
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
