import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ProtectedRoute } from './lib/components/ProtectedRoute/ProtectedRoute';
import { AuthgridProvider } from './lib';

import './lib/i18n';

import './index.css';

const context = {
  baseUrl: 'http://localhost:8080',
};

const Home = () => <div>hello</div>;

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
