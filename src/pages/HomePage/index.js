import React from 'react';

import { Typography, Button, GithubIcon, HeartIcon } from 'Components/UI';
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

const HomePage = () => (
  <HomePageWrapper>
    <Header>
      <Typography variant="h5" color="white">
        ReadMD
      </Typography>
      <GithubButton string="Login With GitHub" />
    </Header>
    <Body>
      <BodyContent>
        <Typography variant="h3">Manage your project documentation</Typography>
        <Typography variant="h6" color="subText">
          With ReadMD you can manage your all READMD files
        </Typography>
        <GithubButton string="Sign up With GitHub" />
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
