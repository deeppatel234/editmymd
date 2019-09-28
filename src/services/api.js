import { APIError, UnauthorizedError } from 'Utilities/errors';
import token from './token';

const reqFilter = async request => {
  const resJson = await request.json();
  if (request.status >= 200 && request.status < 300) {
    return Promise.resolve(resJson);
  }
  if (request.status === 401) {
    return Promise.reject(new UnauthorizedError(resJson.message));
  }
  return Promise.reject(
    new APIError(resJson.message, request.status, request.statusText),
  );
};

const fetchAPI = (url, data) => {
  return new Promise((resolve, rejects) => {
    fetch(url, data)
      .then(reqFilter)
      .then(resolve)
      .catch(rejects);
  });
};

const encodeQueryString = params => {
  const keys = Object.keys(params);

  if (!keys.length) {
    return '';
  }

  const queryString = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  return `?${queryString}`;
};

const get = ({ url, params = {} }) => {
  return fetchAPI(`/api${url}${encodeQueryString(params)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token.get(),
    },
  });
};

const put = ({ url, data = {} }) => {
  return fetchAPI(`/api${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token.get(),
    },
    body: JSON.stringify(data),
  });
};

export default {
  get,
  put,
};
