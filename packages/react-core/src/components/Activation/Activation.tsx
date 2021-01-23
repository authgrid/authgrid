import React from 'react';

import { Auth } from '../Auth/Auth';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useActivationQuery } from '../../actions/auth.actions';

export const Activation = () => {
  const query = useQueryParams();

  const { isError } = useActivationQuery({
    token: query.get('token'),
    userId: query.get('userId'),
  });

  return (
    <Auth>
      {isError
        ? 'Something went wrong while trying to activate your account'
        : 'Your account is successfully activated'}
    </Auth>
  );
};
