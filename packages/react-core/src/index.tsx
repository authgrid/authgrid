import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthcomProvider } from './context/AuthcomProvider';

import './index.css';
import { ProtectedRoute } from './components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const context = {
  baseUrl: 'http://localhost:8080',
};

const Home = () => <div>test</div>;

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthcomProvider context={context}>
        <Switch>
          <ProtectedRoute path="/" component={Home} />
        </Switch>
      </AuthcomProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
);
