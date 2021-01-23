import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ContextHolder } from '../ContextOptions';
import { useGetRefreshToken } from '../actions/auth.actions';
import { getUserMutation } from '../actions/user.actions';
import Loader from '../components/Loader/Loader';
import { Login } from '../components/Login';

export const AuthcomContext = React.createContext({
  user: null,
  isAuthenticated: false,
});

export const AuthcomProvider = ({ children, context }) => {
  const { data, isLoading, isSuccess } = useGetRefreshToken();
  const {
    mutate: mutateUser,
    data: userData,
    status,
    isSuccess: isSuccessUserData,
  } = getUserMutation();
  ContextHolder.setContext(context);

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
        <Route exact path="/account/login" component={Login} />
        <Route>{children}</Route>
      </Switch>
    </AuthcomContext.Provider>
  );
};

export const useAuth = () => {
  const authcomContext = useContext(AuthcomContext);

  return authcomContext;
};
