import React from 'react';

import { Auth } from '../Auth/Auth';
import { useActivationQuery } from '../../actions/user.actions';
import { useQueryParams } from '../../hooks/useQueryParams';

export const Activation = () => {
  const query = useQueryParams();
  //const { data } = useActivationQuery({ token });
  console.log(query.get('token'));
  return <Auth>Your account is successfully activated</Auth>;
};
