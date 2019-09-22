const axios = require('axios');
const config = require('../config');

const GITLAB_API = 'https://gitlab.com/api/v4';

const URL = {
  ACCESS_TOKEN: 'https://gitlab.com/oauth/token', // POST
  USER: `${GITLAB_API}/user`, // GET
};

const apiRequest = (accessToken, params) => {
  const apiOptions = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
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
        client_id: config.gitlab.clientId,
        client_secret: config.gitlab.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3030/api/oauth_redirect',
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
    type: 'gitlab',
    name: user.name,
    email: user.email,
    userId: user.username,
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

const prepareRepoData = repo => {
  return {
    id: repo.id,
    name: repo.name,
    isPrivate: repo.visibility === 'private',
    forkCount: repo.forks_count,
    starCount: repo.star_count,
    defaultBranch: repo.default_branch,
    description: repo.description,
  };
};

const getRepositories = async (accessToken, { username }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITLAB_API}/users/${username}/projects`,
    });
    return data.map(d => prepareRepoData(d));
  } catch (err) {
    throw new Error('Unable to fetch repository');
  }
};

const searchRepositories = async (accessToken, { query, username }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITLAB_API}/users/${username}/projects`,
      params: {
        search: query,
      },
    });
    return data.map(d => prepareRepoData(d));
  } catch (err) {
    throw new Error('Unable to fetch repository');
  }
};

const getMDFilePaths = async (accessToken, { branch, id }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITLAB_API}/projects/${id}/repository/tree`,
      params: {
        recursive: true,
        ref: branch,
        per_page: 100,
      },
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

const getBranchInfo = async (accessToken, { branch, id }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITLAB_API}/projects/${id}/repository/branches/${branch}`,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch branch');
  }
};

const prepareFileContentData = file => {
  return {
    name: file.file_name,
    content:
      file.content && Buffer.from(file.content, 'base64').toString('utf-8'),
    path: file.file_path,
    sha: file.content_sha256,
    fileURL: null,
    size: file.size,
    downloadULR: null,
  };
};

const getFileContent = async (accessToken, { path, branch, id }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITLAB_API}/projects/${id}/repository/files/${path}?ref=${branch}`,
    });

    return prepareFileContentData(data);
  } catch (err) {
    throw new Error('Unable to get file content');
  }
};

const prepareCommitData = data => {
  return {
    url: data.html_url,
    author: data.author,
    committer: data.committer,
    message: data.message,
  };
};

const commitFileContent = async (
  accessToken,
  { path, branch, message, content, sha, id, isNewFile },
) => {
  try {
    const { data } = await apiRequest(accessToken, {
      method: isNewFile ? 'post' : 'put',
      url: `${GITLAB_API}/projects/${id}/repository/files/${path}`,
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
      commit: prepareCommitData({}),
    };
  } catch (err) {
    console.log(err);
    throw new Error('Unable to commit file');
  }
};

module.exports = {
  getAccessToken,
  getUser,
  getRepositories,
  searchRepositories,
  getMDFilePaths,
  getBranchInfo,
  getFileContent,
  commitFileContent,
};
