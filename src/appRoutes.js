import React from 'react';
import { Route } from 'react-router-dom';

import Layout from 'Components/Layout';
import AppHome from 'Pages/AppHome';
import RepoDetails from 'Pages/RepoDetails';

const Editor = React.lazy(() => import('Pages/Editor'));

const AppRoutes = () => (
  <Layout>
    <Route path="/editor" component={Editor} />
    <Route exact path="/repo/:repository" component={RepoDetails} />
    <Route exact path="/" component={AppHome} />
  </Layout>
);

export default AppRoutes;
