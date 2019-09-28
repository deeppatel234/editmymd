const fetchRequest = require('../../utils/fetchRequest');
const config = require('../../config');
const formateData = require('./formateData');

const GITHUB_API = 'https://api.github.com';

const api = async (method, accessToken, params) => {
  return fetchRequest[method]({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
    ...params,
  });
};

const generateAccessToken = async code => {
  const data = await fetchRequest.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: {
      code,
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
    },
  });
  return data.access_token;
};

const user = async accessToken => {
  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/user`,
  });
  return {
    accessToken,
    ...formateData.user(data),
  };
};

const repositoriesList = async ({ accessToken }) => {
  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/user/repos`,
  });
  return data.map(formateData.repository);
};

const searchRepositories = async ({ accessToken, userId }, { query }) => {
  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/search/repositories?q=${query}+user:${userId}`,
  });
  return data.items.map(formateData.repository);
};

const branchList = async ({ accessToken, userId }, { repoId }) => {
  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/branches`,
  });
  return data.map(d => d.name);
};

const branchInfo = ({ accessToken, userId }, { repoId, branch }) => {
  return api('get', accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/branches/${branch}`,
  });
};

const branchTree = async ({ accessToken, userId }, { repoId, branch }) => {
  const branchData = await branchInfo(
    { accessToken, userId },
    { repoId, branch },
  );

  if (!(branchData && branchData.commit)) {
    throw new Error('branch not found');
  }

  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/git/trees/${branchData.commit.sha}?recursive=1`,
  });
  return data.tree.filter(t => t.path.endsWith('.md'));
};

const fileContent = async (
  { accessToken, userId },
  { repoId, path, branch },
) => {
  const data = await api('get', accessToken, {
    url: `${GITHUB_API}/repos/${userId}/${repoId}/contents/${path}?ref=${branch}`,
  });
  return formateData.fileContent(data);
};

const commitFileContent = async (
  { accessToken, userId },
  { repoId, path, branch, message, content, sha },
) => {
  const base64Content = Buffer.from(content).toString('base64');
  const data = await api('put', accessToken, {
    method: 'put',
    url: `${GITHUB_API}/repos/${userId}/${repoId}/contents/${path}`,
    body: {
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
