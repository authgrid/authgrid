import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ContextHolder } from '../ContextOptions';
import { useGetRefreshToken } from '../actions/auth.actions';
import { getUserMutation } from '../actions/user.actions';
import Loader from '../components/Loader/Loader';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { Forgot } from '../components/Forgot/Forgot';
import { Logout } from '../components/Logout/Logout';

export const AuthcomContext = React.createContext({
  user: null,
  isAuthenticated: false,
});

const initialRoutes = {
  login: '/account/login',
  signup: '/account/signup',
  forgot: '/account/forget-password',
  logout: '/account/logout',
};

const initialContext = {
  baseUrl: window.location.origin,
  routes: initialRoutes,
};

export const AuthcomProvider = ({ children, context }) => {
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
    <AuthcomContext.Provider value={{ user: userData, isAuthenticated }}>
      <Switch>
        <Route exact path={contextToSet.routes.login} component={Login} />
        <Route exact path={contextToSet.routes.signup} component={Signup} />
        <Route exact path={contextToSet.routes.forgot} component={Forgot} />
        <Route exact path={contextToSet.routes.logout} component={Logout} />
        <Route>{children}</Route>
      </Switch>
    </AuthcomContext.Provider>
  );
};

export const useAuth = () => {
  const authcomContext = useContext(AuthcomContext);

  return authcomContext;
};
