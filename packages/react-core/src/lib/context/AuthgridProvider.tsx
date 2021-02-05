import React, { useContext, useEffect } from 'react';
import { ContextHolder } from './ContextOptions';
import Loader from '../components/Loader/Loader';
import { useRefreshToken } from '../hooks/useRefresshToken';
import { useGetUser } from '../hooks/useGetUser';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from '../routes';
import { IUser } from '../../../../common/interfaces/user.interfaces';

export const AuthgridContext = React.createContext<{
  user: IUser | null;
  isAuthenticated: boolean;
}>({
  user: null,
  isAuthenticated: false,
});

const initialRoutes = {
  login: '/account/login',
  signup: '/account/signup',
  forgotPassword: '/account/forget-password',
  resetPassword: '/account/reset-password',
  logout: '/account/logout',
  activateAccount: '/account/activate',
};

const initialContext = {
  baseUrl: window.location.origin,
  routes: initialRoutes,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AuthgridContextProvider = ({ children, context }) => {
  const { accessToken, isLoading, isSuccess } = useRefreshToken();
  const { getUser, user, status } = useGetUser();

  const contextToSet = { ...initialContext, ...context };

  ContextHolder.setContext(contextToSet);

  useEffect(() => {
    if (accessToken && !user) {
      getUser();
    }
  }, [accessToken]);

  const isAuthenticated = isSuccess && user;

  if (isLoading || (isSuccess && (status === 'idle' || status === 'loading'))) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthgridContext.Provider value={{ user, isAuthenticated }}>
        {children}
      </AuthgridContext.Provider>
    </QueryClientProvider>
  );
};

export const AuthgridProvider = ({ children, context }) => (
  <QueryClientProvider client={queryClient}>
    <AuthgridContextProvider context={{ ...initialContext, ...context }}>
      <Routes>{children}</Routes>
    </AuthgridContextProvider>
  </QueryClientProvider>
);

export const useAuth = () => useContext(AuthgridContext);
