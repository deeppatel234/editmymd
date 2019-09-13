import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { themeConfig, GlobalStyle } from './theme';

const RenderApp = () => (
  <ThemeProvider theme={themeConfig}>
    <>
      <GlobalStyle />
      <React.Suspense fallback={<div>Loading.....</div>}>
        <App />
      </React.Suspense>
    </>
  </ThemeProvider>
);

ReactDOM.render(<RenderApp />, document.getElementById('root'));
