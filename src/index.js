import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from './App';
import reduxStore from './store';

import { themeConfig, GlobalStyle } from './theme';

const RenderApp = () => (
  <Provider store={reduxStore}>
    <ThemeProvider theme={themeConfig}>
      <>
        <GlobalStyle />
        <React.Suspense fallback={<div>Loading.....</div>}>
          <App />
        </React.Suspense>
      </>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(<RenderApp />, document.getElementById('root'));
