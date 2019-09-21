import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Auth from 'Components/Auth';
import AppLoading from 'Components/AppLoading';
import OAuth from 'Pages/OAuth';

const AppRoute = React.lazy(() => import('./appRoutes'));
const Homepage = React.lazy(() => import('Pages/HomePage'));

const LoadApp = ({ history }) => (
  <Auth fallback={Homepage}>
    <AppRoute history={history} />
  </Auth>
);

const App = () => (
  <React.Suspense fallback={<AppLoading />}>
    <BrowserRouter>
      <Switch>
        <Route path="/oauth/:token" component={OAuth} />
        <Redirect from="/logout" to="/" />
        <Route path="/" component={LoadApp} />
      </Switch>
    </BrowserRouter>
  </React.Suspense>
);

export default App;
