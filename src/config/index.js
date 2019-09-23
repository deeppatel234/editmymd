export default {
  githubURL: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_KEY}&scope=user%20repo&state=github`,
  gitlabURL: `https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_KEY}&redirect_uri=${GITLAB_REDIRECT_URI}&response_type=code&state=gitlab&scope=api+read_user+email`,
};
