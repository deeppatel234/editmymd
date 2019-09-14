import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(1.5, 4)};
  background: ${props => props.theme.palette.background.dark};
  box-shadow: 0 5px 5px -5px;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  background: ${props => props.theme.palette.grey.grey50};
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: ${props => props.theme.spacing(1)};
  }
`;
