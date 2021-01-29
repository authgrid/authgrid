import { getUserMutation } from '../actions/user.actions';

export const useGetUser = () => {
  const { mutate: getUser, data, status, isSuccess } = getUserMutation();

  return {
    getUser,
    user: data,
    status,
    isSuccess,
  };
};
