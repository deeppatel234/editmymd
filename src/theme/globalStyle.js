import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

  html {
    ${props =>
      props.theme.breakpoints.lessThan(props.theme.breakpoints.md)(css`
        font-size: 14px;
      `)}
    ${props =>
      props.theme.breakpoints.lessThan(props.theme.breakpoints.sm)(css`
        font-size: 12px;
      `)}
  }

  body {
    margin: 0;
    color: ${props => props.theme.palette.text};
    ${props => props.theme.typography.body}
    background-color: ${props => props.theme.palette.background.body};
  }

  input::-webkit-input-placeholder,
  input::-moz-placeholder,
  input:-ms-input-placeholder,
  input:-moz-placeholder {
    font-family: ${props => props.theme.typography.body.fontFamily};
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
