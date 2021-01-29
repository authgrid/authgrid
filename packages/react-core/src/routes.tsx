import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { ResetPassword } from './components/ResetPassword/ResetPassword';
import { Logout } from './components/Logout/Logout';
import { Activation } from './components/Activation/Activation';
import { ContextHolder } from './context/ContextOptions';

export const Routes = ({ children }) => {
  const { routes } = ContextHolder.getContext();

  return (
    <Switch>
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.signup} component={Signup} />
      <Route exact path={routes.forgotPassword} component={ForgotPassword} />
      <Route exact path={routes.resetPassword} component={ResetPassword} />
      <Route exact path={routes.logout} component={Logout} />
      <Route exact path={routes.activateAccount} component={Activation} />
      <Route>{children}</Route>
    </Switch>
  );
};
