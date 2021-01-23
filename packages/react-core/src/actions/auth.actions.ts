import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'auth';

export const useGetRefreshToken = () =>
  useQuery([queryKey, 'refresh'], () => Request('/authcom/auth/token/refresh'));

export const useLoginUser = () =>
  useMutation([queryKey, 'user'], (data) =>
    Request('/authcom/local/login', { method: 'POST', data })
  );

export const useSignUpUser = () =>
  useMutation<any, Error>([queryKey, 'signup'], (data) =>
    Request('/authcom/local/signup', { method: 'POST', data })
  );

export const useActivationQuery = ({ userId, token }) =>
  useQuery([queryKey, 'activate'], () =>
    Request('/authcom/auth/activate', {
      method: 'POST',
      data: {
        token,
        userId,
      },
    })
  );
