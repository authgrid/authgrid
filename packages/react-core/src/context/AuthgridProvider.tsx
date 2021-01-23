import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ContextHolder } from '../ContextOptions';
import { useGetRefreshToken } from '../actions/auth.actions';
import { getUserMutation } from '../actions/user.actions';
import Loader from '../components/Loader/Loader';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { Forgot } from '../components/Forgot/Forgot';
import { Logout } from '../components/Logout/Logout';
import { Activation } from '../components/Activation/Activation';

export const AuthgridContext = React.createContext({
  user: null,
  isAuthenticated: false,
});

const initialRoutes = {
  login: '/account/login',
  signup: '/account/signup',
  forgot: '/account/forget-password',
  logout: '/account/logout',
  activate: '/account/activate',
};

const initialContext = {
  baseUrl: window.location.origin,
  routes: initialRoutes,
};

export const AuthgridProvider = ({ children, context }) => {
  const { data, isLoading, isSuccess } = useGetRefreshToken();
  const {
    mutate: mutateUser,
    data: userData,
    status,
    isSuccess: isSuccessUserData,
  } = getUserMutation();

  const contextToSet = { ...initialContext, ...context };

  ContextHolder.setContext(contextToSet);

  if (data?.accessToken) {
    ContextHolder.setAccessToken(data.accessToken);
  }

  useEffect(() => {
    if (data?.accessToken) {
      mutateUser();
    }
  }, [data]);

  const isAuthenticated = isSuccess && isSuccessUserData;

  if (isLoading || (isSuccess && status === 'idle') || status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <AuthgridContext.Provider value={{ user: userData, isAuthenticated }}>
      <Switch>
        <Route exact path={contextToSet.routes.login} component={Login} />
        <Route exact path={contextToSet.routes.signup} component={Signup} />
        <Route exact path={contextToSet.routes.forgot} component={Forgot} />
        <Route exact path={contextToSet.routes.logout} component={Logout} />
        <Route
          exact
          path={contextToSet.routes.activate}
          component={Activation}
        />
        <Route>{children}</Route>
      </Switch>
    </AuthgridContext.Provider>
  );
};

export const useAuth = () => useContext(AuthgridContext);
