import styled, { css } from 'styled-components';

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(2, 4)};
  background: ${props => props.theme.palette.background.dark};
  box-shadow: 0 5px 5px -5px;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  ${props =>
    props.theme.breakpoints.lessThan(props.theme.breakpoints.sm)(css`
      flex-direction: column;
    `)}

  h3 {
    margin: ${props => props.theme.spacing(2, 0)};
    word-break: break-word;
  }

  h6 {
    margin: ${props => props.theme.spacing(1, 0, 4, 0)};
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing(2, 4)};
  box-shadow: 0 -2px 3px #f1f1f1;

  svg {
    margin: 0 5px;
  }
`;

export const BodyContent = styled.div`
  width: 50%;
  padding: 5%;
  ${props =>
    props.theme.breakpoints.lessThan(props.theme.breakpoints.sm)(css`
      width: 100%;
    `)}
`;

export const HomePageImage = styled.img`
  width: 100%;
`;
