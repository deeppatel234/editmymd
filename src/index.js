import React from 'react';
import ReactDOM from 'react-dom';

const URL = `https://github.com/login/oauth/authorize?client_id=c89dd5f13749cb45b154&scope=user%20repo`;

const Hello = () => {
  return <a href={URL}>Hello</a>;
};

ReactDOM.render(<Hello />, document.getElementById('root'));
