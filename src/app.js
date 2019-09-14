import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from 'Components/Auth';
import Layout from 'Components/Layout';
import Homepage from 'Pages/HomePage';
import OAuth from 'Pages/OAuth';
import AppHome from 'Pages/AppHome';
import ReadMD from 'Pages/ReadMD';
import RepoDetails from 'Pages/RepoDetails';

const AppRoutes = () => (
  <Auth fallback={Homepage}>
    <Layout>
      <Route path="/readmd/:repo" component={ReadMD} />
      <Route exact path="/repo/:repository" component={RepoDetails} />
      <Route exact path="/" component={AppHome} />
    </Layout>
  </Auth>
);

const AppRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/oauth/:token" component={OAuth} />
      <Route path="/" component={AppRoutes} />
    </Switch>
  </BrowserRouter>
);

export default AppRoute;
