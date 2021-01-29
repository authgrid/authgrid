import React from 'react';
import Loader from '../Loader/Loader';
import { Request } from '../../utils/request';

export const Logout = () => {
  Request('/authgrid/auth/logout').finally(() => {
    location.replace('/');
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};
