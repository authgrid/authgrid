import { useMutation } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'user';

export const getUserMutation = () =>
  useMutation(queryKey, () => Request('/authcom/user/me'));
