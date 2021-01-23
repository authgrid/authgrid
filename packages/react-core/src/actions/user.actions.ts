import { useQuery, useMutation } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'user';

export const getUserMutation = () =>
  useMutation(queryKey, () => Request('/authcom/user/me'));

export const useActivationQuery = ({ token }) =>
  useQuery(queryKey, () =>
    Request('/authcom/user/activate', {
      method: 'POST',
      data: {
        token,
      },
    })
  );
