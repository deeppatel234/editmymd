import React from 'react';

import { Typography, Button, GithubIcon, HeartIcon } from 'Components/UI';

import {
  Header,
  Footer,
  HomePageWrapper,
  Body,
  BodyContent,
  HomePageImage,
} from './styled';

const HomePage = () => (
  <HomePageWrapper>
    <Header>
      <Typography variant="h5" color="white">
        ReadMD
      </Typography>
      <Button size="small" color="primary">
        <GithubIcon width="1.5em" height="1.5em" />
        Login With GitHub
      </Button>
    </Header>
    <Body>
      <BodyContent>
        <Typography variant="h3">Manage your project documentation</Typography>
        <Typography variant="h6" color="subText">
          With ReadMD you can manage your all READMD files
        </Typography>
        <Button color="primary">
          <GithubIcon width="1.5em" height="1.5em" />
          Sign up With GitHub
        </Button>
      </BodyContent>
      <BodyContent>
        <HomePageImage src="/assets/homepage-vector.svg" />
      </BodyContent>
    </Body>
    <Footer>
      Made With <HeartIcon /> in India
    </Footer>
  </HomePageWrapper>
);

export default HomePage;
