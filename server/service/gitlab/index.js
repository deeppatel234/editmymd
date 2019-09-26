const axios = require('axios');
const config = require('../../config');
const formateData = require('./formateData');

const GITLAB_API = 'https://gitlab.com/api/v4';

const apiRequest = async (accessToken, params) => {
  try {
    const apiOptions = {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      ...params,
    };

    const { data } = await axios(apiOptions);
    return data;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        message: err.message,
        response: err.response.data,
        params,
      }),
    );
  }
};

const generateAccessToken = async code => {
  const { data } = await axios({
    url: 'https://gitlab.com/oauth/token',
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    data: {
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
  const data = await apiRequest(accessToken, {
    url: `${GITLAB_API}/user`,
  });
  return {
    accessToken,
    ...formateData.user(data),
  };
};

const repositoriesList = async ({ accessToken, userId }) => {
  const data = await apiRequest(accessToken, {
    url: `${GITLAB_API}/users/${userId}/projects`,
  });
  return data.map(formateData.repository).filter(d => d.defaultBranch !== null);
};

const searchRepositories = async ({ accessToken, userId }, { query }) => {
  const data = await apiRequest(accessToken, {
    url: `${GITLAB_API}/users/${userId}/projects`,
    params: {
      search: query,
    },
  });
  return data.map(formateData.repository).filter(d => d.defaultBranch !== null);
};

const branchInfo = async ({ accessToken }, { branch, repoId }) => {
  return apiRequest(accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/branches/${branch}`,
  });
};

const branchTree = async ({ accessToken }, { branch, repoId }) => {
  const data = await apiRequest(accessToken, {
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
  const data = await apiRequest(accessToken, {
    url: `${GITLAB_API}/projects/${repoId}/repository/files/${path}?ref=${branch}`,
  });
  return formateData.fileContent(data);
};

const commitFileContent = async (
  { accessToken },
  { path, branch, message, content, sha, repoId, isNewFile },
) => {
  const data = await apiRequest(accessToken, {
    method: isNewFile ? 'post' : 'put',
    url: `${GITLAB_API}/projects/${repoId}/repository/files/${path}`,
    data: {
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
  fileContent,
  generateAccessToken,
  repositoriesList,
  searchRepositories,
  user,
};
