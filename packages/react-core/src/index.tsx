import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthgridProvider, ProtectedRoute, useAuth } from './lib';

import './index.css';

const context = {
  baseUrl: 'http://localhost:8080',
};

const Home = () => {
  const { user } = useAuth();

  return <div>{user?.email}</div>;
};

ReactDOM.render(
  <BrowserRouter>
    <AuthgridProvider context={context}>
      <Switch>
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </AuthgridProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
