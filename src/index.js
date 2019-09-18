import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import spacingFactor from 'Utilities/spacingFactor';
import App from './app';
import reduxStore from './store';

import { themeConfig, GlobalStyle } from './theme';

themeConfig.spacing = themeConfig.spacing(spacingFactor(themeConfig));

const RenderApp = () => (
  <Provider store={reduxStore}>
    <ThemeProvider theme={themeConfig}>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(<RenderApp />, document.getElementById('root'));
