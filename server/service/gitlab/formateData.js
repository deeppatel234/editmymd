const user = data => {
  return {
    type: 'gitlab',
    name: data.name,
    email: data.email,
    userId: data.username,
    profilePicture: data.avatar_url,
    accountInfo: data,
  };
};

const repository = repo => {
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

const fileContent = file => {
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
