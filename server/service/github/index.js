const axios = require('axios');
const config = require('../../config');
const formateData = require('./formateData');

const GITHUB_API = 'https://api.github.com';

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

const generateAccessToken = async code => {
  const { data } = await axios({
    url: 'https://github.com/login/oauth/access_token',
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    data: {
      code,
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
    },
  });
  return data.access_token;
};

const user = async accessToken => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/user`,
  });
  return {
    accessToken,
    ...formateData.user(data),
  };
};

const repositoriesList = async ({ accessToken }) => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/user/repos`,
  });
  return data.map(formateData.repository);
};

const searchRepositories = async ({ accessToken, userId }, { query }) => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/search/repositories?q=${query}+user:${userId}`,
  });
  return data.items.map(formateData.repository);
};

const branchList = async ({ accessToken, userId }, { repoId }) => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/branches`,
  });
  return data.map(d => d.name);
};

const branchInfo = async ({ accessToken, userId }, { repoId, branch }) => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/branches/${branch}`,
  });
  return data;
};

const branchTree = async ({ accessToken, userId }, { repoId, branch }) => {
  const branchData = await branchInfo(
    { accessToken, userId },
    { repoId, branch },
  );

  if (!(branchData && branchData.commit)) {
    throw new Error('branch not found');
  }

  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/git/trees/${branchData.commit.sha}?recursive=1`,
  });
  return data.tree.filter(t => t.path.endsWith('.md'));
};

const fileContent = async (
  { accessToken, userId },
  { repoId, path, branch },
) => {
  const { data } = await apiRequest(accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/contents/${path}?ref=${branch}`,
  });
  return formateData.fileContent(data);
};

const commitFileContent = async (
  { accessToken, userId },
  { repoId, path, branch, message, content, sha },
) => {
  const base64Content = Buffer.from(content).toString('base64');
  const { data } = await apiRequest(accessToken, {
    method: 'put',
    url: `${GITHUB_API}/repos/${userId}/${repoId}/contents/${path}`,
    data: {
      message,
      content: base64Content,
      sha,
      branch,
    },
  });

  return {
    content: formateData.fileContent(data.content),
    commit: formateData.commit(data.commit),
  };
};

module.exports = {
  branchList,
  branchInfo,
  branchTree,
  commitFileContent,
  fileContent,
  generateAccessToken,
  repositoriesList,
  searchRepositories,
  user,
};
