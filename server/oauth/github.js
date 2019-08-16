const axios = require('axios');

const getAccessToken = async code => {
  const apiOptions = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    data: {
      code,
      client_id: process.env.GITHUB_CLIENT_KEY,
      client_secret: process.env.GITHUB_SECRET_KEY,
    },
  };

  try {
    const { data } = await axios(apiOptions);
    const { access_token: accessToken } = data;

    return accessToken;
  } catch (err) {
    throw new Error('Unable to fetch Access Token');
  }
};

const getUserDetails = async accessToken => {
  const apiOptions = {
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  };

  try {
    const { data } = await axios(apiOptions);
    return data;
  } catch (err) {
    throw new Error('Unable to fetch user');
  }
};

module.exports = {
  getAccessToken,
  getUserDetails,
};
