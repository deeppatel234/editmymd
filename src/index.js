import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import OAuth from './pages/OAuth';
import Homepage from './pages/HomePage';

import theme from './style/theme';
import GlobalStyle from './style/globalStyle';

const RenderApp = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading.....</div>}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/oauth/:token" component={OAuth} />
            <Route path="/" component={Homepage} />
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  </ThemeProvider>
);

ReactDOM.render(<RenderApp />, document.getElementById('root'));
