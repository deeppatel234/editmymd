const fetchRequest = require('../../utils/fetchRequest');
const config = require('../../config');
const formateData = require('./formateData');

const GITLAB_API = 'https://gitlab.com/api/v4';

const api = async (method, accessToken, params) => {
  return fetchRequest[method]({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    ...params,
  });
};

const generateAccessToken = async code => {
  const data = await fetchRequest.post({
    url: 'https://gitlab.com/oauth/token',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: {
      code,
      client_id: config.gitlab.clientId,
      client_secret: config.gitlab.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: config.gitlab.redirectURI,
    },
  });
  return data.access_token;
};

const user = async accessToken => {
  const data = await api('get', accessToken, {
    url: `${GITLAB_API}/user`,
  });
  return {
    accessToken,
    ...formateData.user(data),
  };
};

const repositoriesList = async ({ accessToken, userId }) => {
  const data = await api('get', accessToken, {
    url: `${GITLAB_API}/users/${userId}/projects`,
  });
  return data.map(formateData.repository).filter(d => d.defaultBranch !== null);
};

const searchRepositories = async ({ accessToken, userId }, { query }) => {
  const data = await api('get', accessToken, {
    url: `${GITLAB_API}/users/${userId}/projects`,
    params: {
      search: query,
    },
  });
  return data.map(formateData.repository).filter(d => d.defaultBranch !== null);
};

const branchInfo = async ({ accessToken }, { branch, repoId }) => {
  return api('get', accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/branches/${branch}`,
  });
};

const createBranch = async ({ accessToken }, { branch, repoId, ref }) => {
  return api('post', accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/branches`,
    body: {
      branch,
      ref,
    },
  });
};

const branchTree = async ({ accessToken }, { branch, repoId }) => {
  const data = await api('get', accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/tree`,
    params: {
      recursive: true,
      ref: branch,
      per_page: 100,
    },
  });
  return data.filter(t => t.path.endsWith('.md'));
};

const fileContent = async ({ accessToken }, { path, branch, repoId }) => {
  const data = await api('get', accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/files/${path}?ref=${branch}`,
  });
  return formateData.fileContent(data);
};

const commitFileContent = async (
  { accessToken },
  { path, branch, message, content, sha, repoId, isNewFile },
) => {
  const data = await api(isNewFile ? 'post' : 'put', accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/files/${path}`,
    body: {
      commit_message: message,
      content,
      branch,
    },
  });

  return {
    content: {
      path: data.file_path,
      sha,
      name: null,
      size: null,
      fileURL: null,
      downloadULR: null,
    },
    commit: formateData.commit({}),
  };
};

module.exports = {
  branchInfo,
  branchTree,
  commitFileContent,
  createBranch,
  fileContent,
  generateAccessToken,
  repositoriesList,
  searchRepositories,
  user,
};
