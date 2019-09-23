const user = data => {
  return {
    type: 'github',
    name: data.name,
    email: data.email,
    userId: data.login,
    profilePicture: data.avatar_url,
    accountInfo: data,
  };
};

const repository = repo => {
  return {
    id: repo.id,
    repoId: repo.name,
    name: repo.name,
    isPrivate: repo.private,
    forkCount: repo.forks,
    starCount: repo.stargazers_count,
    defaultBranch: repo.default_branch,
    description: repo.description,
  };
};

const fileContent = file => {
  return {
    name: file.name,
    content:
      file.content && Buffer.from(file.content, 'base64').toString('utf-8'),
    path: file.path,
    sha: file.sha,
    fileURL: file.html_url,
    size: file.size,
    downloadULR: file.download_url,
  };
};

const commit = data => {
  return {
    url: data.html_url,
    author: data.author,
    committer: data.committer,
    message: data.message,
  };
};

module.exports = {
  user,
  repository,
  fileContent,
  commit,
};
