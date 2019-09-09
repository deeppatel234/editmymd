const axios = require('axios');

const GITHUB_API = 'https://api.github.com';

const URL = {
  ACCESS_TOKEN: 'https://github.com/login/oauth/access_token', // POST
  USER: `${GITHUB_API}/user`, // GET
  REPOSITORY: `${GITHUB_API}/user/repos`, // GET
  SEARCH_REPOSITORY: `${GITHUB_API}/search/repositories`, // GET
};

const apiRequest = (accessToken, params) => {
  const apiOptions = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
    ...params,
  };
  return axios(apiOptions);
};

const getAccessToken = async code => {
  try {
    const { data } = await axios({
      url: URL.ACCESS_TOKEN,
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: {
        code,
        client_id: process.env.GITHUB_CLIENT_KEY,
        client_secret: process.env.GITHUB_SECRET_KEY,
      },
    });
    const { access_token: accessToken } = data;

    return accessToken;
  } catch (err) {
    throw new Error('Unable to fetch Access Token');
  }
};

const prepareGithubUserData = user => {
  return {
    type: 'github',
    name: user.name,
    email: user.email,
    userId: user.login,
    profilePicture: user.avatar_url,
    accountInfo: user,
  };
};

const getUser = async accessToken => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: URL.USER,
    });
    return {
      accessToken,
      ...prepareGithubUserData(data),
    };
  } catch (err) {
    throw new Error('Unable to fetch user');
  }
};

const getRepositories = async accessToken => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: URL.REPOSITORY,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch repository');
  }
};

const searchRepositories = async (accessToken, { query }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: URL.SEARCH_REPOSITORY,
      params: {
        q: query,
      },
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

const getBranchInfo = async (accessToken, { owner, repo, branch }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITHUB_API}/repos/${owner}/${repo}/branches/${branch}`,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

const getBranchTree = async (accessToken, { owner, repo, treeHash }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${treeHash}?recursive=1`,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

module.exports = {
  getBranchInfo,
  getAccessToken,
  getUser,
  getRepositories,
  searchRepositories,
  getBranchTree,
};
