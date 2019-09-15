import React, { useState, useEffect } from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github-gist.css';

import PageHeader from 'Components/PageHeader';
import { RepositoryIcon, BookIcon, FileIcon, Typography } from 'Components/UI';

import Request from 'Services';

import { EditorWrapper } from './styled';

const EditorPage = ({ location }) => {
  const [content, setContent] = useState('');
  const { branch, path, repo } = location.state;

  useEffect(() => {
    Request.apiGet({
      url: '/file',
      params: {
        branch,
        path,
        repo,
      },
    }).then(({ content: fileContent }) => setContent(fileContent));
  }, []);

  if (!content) {
    return null;
  }

  return (
    <>
      <PageHeader title={path} />
      <EditorWrapper>
        <MDEditor
          defaultValue={content}
          // onChange={onChageValue}
          parserOptions={{
            breaks: false,
            highlight: code => hljs.highlightAuto(code).value,
          }}
        />
      </EditorWrapper>
    </>
  );
};

export default EditorPage;
