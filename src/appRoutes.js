import React from 'react';
import { Route } from 'react-router-dom';

import Layout from 'Components/Layout';
import PWAPrompt from 'Components/PWAPrompt';
import AppHome from 'Pages/AppHome';
import RepoDetails from 'Pages/RepoDetails';

const Editor = React.lazy(() => import('Pages/Editor'));

const AppRoutes = ({ history }) => (
  <Layout history={history}>
    <Route path="/editor" component={Editor} />
    <Route exact path="/repo/:repository" component={RepoDetails} />
    <Route exact path="/" component={AppHome} />
    <PWAPrompt />
  </Layout>
);

export default AppRoutes;
