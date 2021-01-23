import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'auth';

export const useGetRefreshToken = () =>
  useQuery(queryKey, () => Request('/authcom/auth/token/refresh'));

export const useLoginUser = () =>
  useMutation(queryKey, (data) =>
    Request('/authcom/local/login', { method: 'POST', data })
  );

export const useSignUpUser = () =>
  useMutation(queryKey, (data) =>
    Request('/authcom/local/signup', { method: 'POST', data })
  );
