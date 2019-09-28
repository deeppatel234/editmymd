const fetch = require('node-fetch');
const { APIError } = require('./errors');

const reqFilter = async request => {
  const resJson = await request.json();
  if (request.status >= 200 && request.status < 300) {
    return Promise.resolve(resJson);
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

const get = ({ url, params = {}, ...restData }) => {
  return fetchAPI(`${url}${encodeQueryString(params)}`, {
    method: 'GET',
    ...restData,
  });
};

const post = ({ url, body = {}, ...restData }) => {
  return fetchAPI(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...restData,
  });
};

const put = ({ url, body = {}, ...restData }) => {
  return fetchAPI(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...restData,
  });
};

module.exports = {
  get,
  post,
  put,
};
