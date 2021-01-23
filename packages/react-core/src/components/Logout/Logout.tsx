import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Request } from '../../utils/request';

export const Logout = () => {
  Request('/authcom/auth/logout').finally(() => {
    location.replace('/');
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};
