import { createGlobalStyle } from 'styled-components';

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
`;

export default GlobalStyle;
