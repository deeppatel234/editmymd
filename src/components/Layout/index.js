import React from 'react';
import { connect } from 'react-redux';

import { Typography, Avatar } from 'Components/UI';

import {
  LayoutWrapper,
  HeaderWrapper,
  BodyWrapper,
  UserProfile,
} from './styled';

const Layout = ({ user, children }) => (
  <LayoutWrapper>
    <HeaderWrapper>
      <Typography variant="h6" color="white">
        ReadMD
      </Typography>
      <UserProfile>
        <Avatar alt="profile-picture" image={user.profilePicture} />
        <Typography color="white">{user.name}</Typography>
      </UserProfile>
    </HeaderWrapper>
    <BodyWrapper>{children}</BodyWrapper>
  </LayoutWrapper>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Layout);
