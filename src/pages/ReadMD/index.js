import React, { useState, useEffect } from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'md-editor-react/dist/style.css';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github-gist.css';

import service from 'Services';

const ReadMD = ({ match }) => {
  const [data, setData] = useState(false);
  const [content, setContent] = useState('');
  const [sha, setShat] = useState('');

  useEffect(() => {
    service
      .apiGet({
        url: '/readmd',
        params: {
          repo: match.params.repo,
        },
      })
      .then(res => {
        setData(res.content);
        setShat(res.data.sha);
      });
  }, []);

  const onChageValue = value => {
    setContent(value);
  };

  const commitInMaster = () => {
    service.api({
      url: '/readmd/commit',
      data: {
        content,
        repo: match.params.repo,
        sha,
        branch: 'my-branch',
      },
    });
  };

  if (data !== false) {
    return (
      <>
        <div role="button" tabIndex="0" onClick={commitInMaster}>
          commit in master
        </div>
        <MDEditor
          defaultValue={data}
          onChange={onChageValue}
          parserOptions={{
            breaks: false,
            highlight: code => hljs.highlightAuto(code).value,
          }}
        />
      </>
    );
  }
  return <div>hello {match.params.repo}</div>;
};

export default ReadMD;
