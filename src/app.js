import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from 'Components/Auth';
import Layout from 'Components/Layout';
import Homepage from 'Pages/HomePage';
import OAuth from 'Pages/OAuth';
import AppHome from 'Pages/AppHome';
import AddRepository from 'Pages/AddRepository';
import ReadMD from 'Pages/ReadMD';

const AppRoutes = () => (
  <Auth fallback={Homepage}>
    <Layout>
      <Route path="/readmd/:repo" component={ReadMD} />
      <Route path="/add-repository" component={AddRepository} />
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
