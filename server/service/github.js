const axios = require('axios');
const config = require('../config');

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
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
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

const prepareRepoData = repo => {
  return {
    id: repo.id,
    name: repo.name,
    isPrivate: repo.private,
    forkCount: repo.forks,
    starCount: repo.stargazers_count,
    defaultBranch: repo.default_branch,
    description: repo.description,
  };
};

const getRepositories = async accessToken => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: URL.REPOSITORY,
    });
    return data.map(d => prepareRepoData(d));
  } catch (err) {
    throw new Error('Unable to fetch repository');
  }
};

const searchRepositories = async (accessToken, { query, username }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${URL.SEARCH_REPOSITORY}?q=${query}+user:${username}`,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

const listBranches = async (accessToken, { owner, repo }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITHUB_API}/repos/${owner}/${repo}/branches`,
    });
    return data;
  } catch (err) {
    throw new Error('Unable to fetch branch list');
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

const getReadMDPaths = async (accessToken, { owner, branch, repo, sha }) => {
  let treeHash = sha;
  try {
    if (!treeHash) {
      const branchInfo = await getBranchInfo(accessToken, {
        owner,
        repo,
        branch,
      });
      treeHash = branchInfo.commit.sha;
      if (!branchInfo) {
        throw new Error('branch not found');
      }
    }
    const { tree } = await getBranchTree(accessToken, {
      owner,
      repo,
      treeHash,
    });

    return tree.filter(t => t.path.includes('README.md'));
  } catch (err) {
    throw new Error('Unable to fetch tree');
  }
};

const prepareFileContentData = file => {
  return {
    name: file.name,
    content: Buffer.from(file.content, 'base64').toString('utf-8'),
    path: file.path,
    sha: file.sha,
    fileURL: file.html_url,
    size: file.size,
    downloadULR: file.download_url,
  };
};

const getFileContent = async (accessToken, { owner, repo, path, branch }) => {
  try {
    const { data } = await apiRequest(accessToken, {
      url: `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    });

    return prepareFileContentData(data);
  } catch (err) {
    throw new Error('Unable to fetch branch list');
  }
};

module.exports = {
  getBranchInfo,
  getAccessToken,
  getUser,
  getRepositories,
  searchRepositories,
  listBranches,
  getBranchTree,
  getReadMDPaths,
  getFileContent,
};
