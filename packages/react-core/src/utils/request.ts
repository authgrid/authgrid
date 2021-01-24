import { ContextHolder } from '../context/ContextOptions';

interface IRequest {
  method?: string;
  data?: any;
  query?: {
    [key: string]: any;
  };
}

export const Request = (
  url: string,
  { method, data, query }: IRequest = {
    method: 'GET',
  }
) => {
  const baseUrl = ContextHolder.getContext()?.baseUrl;
  const accessToken = ContextHolder.getAccessToken();

  let queryString;

  if (query) {
    queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  return fetch(`${baseUrl}${url}${queryString ? `?${queryString}` : ''}`, {
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + accessToken,
    },
    body: data && JSON.stringify(data),
    credentials: 'include',
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json())?.data;
  });
};
