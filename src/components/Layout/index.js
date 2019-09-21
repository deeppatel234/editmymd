import React from 'react';
import { connect } from 'react-redux';

import {
  Typography,
  Avatar,
  SignOutIcon,
  BaseDropDown,
  MenuDropdown,
  ChevronDownIcon,
} from 'Components/UI';

import { actions } from 'State/user';

import {
  LayoutWrapper,
  HeaderWrapper,
  BodyWrapper,
  UserProfile,
} from './styled';

const Layout = ({ user, children, unsetUserData, history }) => (
  <LayoutWrapper>
    <HeaderWrapper>
      <Typography variant="h6" color="white">
        ReadMD
      </Typography>
      <BaseDropDown
        position="left"
        dropDownComponent={
          <MenuDropdown.DropDown
            items={[
              {
                label: 'Logout',
                icon: <SignOutIcon />,
                props: {
                  onClick: () => {
                    unsetUserData();
                    history.push('/logout');
                  },
                },
              },
            ]}
          />
        }
      >
        {props => (
          <UserProfile {...props}>
            <Avatar alt="profile-picture" image={user.profilePicture} />
            <Typography color="white">{user.name}</Typography>
            <ChevronDownIcon color="white" height="1.5em" width="1.5em" />
          </UserProfile>
        )}
      </BaseDropDown>
    </HeaderWrapper>
    <BodyWrapper>{children}</BodyWrapper>
  </LayoutWrapper>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { unsetUserData: actions.unsetUserData },
)(Layout);
