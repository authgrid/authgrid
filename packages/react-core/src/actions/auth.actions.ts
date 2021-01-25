import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'auth';

export const useGetRefreshToken = () =>
  useMutation([queryKey, 'refresh'], () =>
    Request('/authgrid/auth/token/refresh')
  );

export const useLoginUser = () =>
  useMutation([queryKey, 'user'], (data) =>
    Request('/authgrid/local/login', { method: 'POST', data })
  );

export const useSignUpUser = () =>
  useMutation<any, Error>([queryKey, 'signup'], (data) =>
    Request('/authgrid/local/signup', { method: 'POST', data })
  );

export const useForgotPassword = () =>
  useMutation([queryKey, 'forgot-password'], (data) =>
    Request('/authgrid/auth/forgot-password', { method: 'POST', data })
  );

export const useResetPassword = ({ token }) =>
  useMutation([queryKey, 'reset-password'], (data) =>
    Request(`/authgrid/auth/reset-password?token=${token}`, {
      method: 'POST',
      data,
    })
  );

export const useActivationQuery = ({ userId, token }) =>
  useQuery([queryKey, 'activate'], () =>
    Request('/authgrid/auth/activate', {
      method: 'POST',
      data: {
        token,
        userId,
      },
    })
  );
