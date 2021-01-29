import { useGetRefreshToken } from '../actions/auth.actions';
import { useEffect, useRef } from 'react';
import { ContextHolder } from '../context/ContextOptions';

export const useRefreshToken = () => {
  const timer = useRef<any>(0);
  const { mutate, data, status, isSuccess } = useGetRefreshToken();

  const accessToken = data?.accessToken;

  const getRefreshToken = (firstTime = false) => {
    timer.current && clearInterval(timer.current);

    if (firstTime) {
      mutate();
    } else {
      const ttl = data.expiresIn * 1000;
      timer.current = setInterval(mutate, ttl);
    }
  };

  useEffect(() => {
    getRefreshToken(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      ContextHolder.setAccessToken(accessToken);

      getRefreshToken();
    }
  }, [accessToken]);

  return {
    accessToken,
    status,
    isLoading: status === 'idle' || status === 'loading',
    isSuccess,
  };
};
