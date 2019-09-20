import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from 'Components/Auth';
import AppLoading from 'Components/AppLoading';
import OAuth from 'Pages/OAuth';

const AppRoute = React.lazy(() => import('./appRoutes'));
const Homepage = React.lazy(() => import('Pages/HomePage'));

const LoadApp = () => (
  <Auth fallback={Homepage}>
    <AppRoute />
  </Auth>
);

const App = () => (
  <React.Suspense fallback={<AppLoading />}>
    <BrowserRouter>
      <Switch>
        <Route path="/oauth/:token" component={OAuth} />
        <Route path="/" component={LoadApp} />
      </Switch>
    </BrowserRouter>
  </React.Suspense>
);

export default App;
