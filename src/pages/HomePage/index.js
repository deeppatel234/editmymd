import React from 'react';

import {
  Typography,
  Button,
  GithubIcon,
  HeartIcon,
  GitLabIcon,
} from 'Components/UI';
import config from '../../config';

import {
  Header,
  Footer,
  HomePageWrapper,
  Body,
  BodyContent,
  HomePageImage,
} from './styled';

const GithubButton = ({ string }) => (
  <Button
    as="a"
    icon={<GithubIcon width="1.5em" height="1.5em" />}
    href={config.githubURL}
    size="small"
    color="primary"
  >
    {string}
  </Button>
);

const GitLabButton = ({ string }) => (
  <Button
    as="a"
    icon={<GitLabIcon width="1.5em" height="1.5em" />}
    href={config.gitlabURL}
    size="small"
    color="orange"
  >
    {string}
  </Button>
);

const HomePage = () => (
  <HomePageWrapper>
    <Header>
      <Typography variant="h5" color="white">
        editmymd
      </Typography>
    </Header>
    <Body>
      <BodyContent>
        <Typography variant="h3">Manage your project documentation</Typography>
        <Typography variant="h6" color="subText">
          With editmymd you can manage your all markdown files
        </Typography>
        <GithubButton string="Login With GitHub" />
        <GitLabButton string="Login With GitLab" />
      </BodyContent>
      <BodyContent>
        <HomePageImage alt="homepage-image" src="/assets/homepage-vector.svg" />
      </BodyContent>
    </Body>
    <Footer>
      Made With <HeartIcon /> in India
    </Footer>
  </HomePageWrapper>
);

export default HomePage;
