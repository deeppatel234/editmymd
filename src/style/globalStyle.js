import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
  }
`;

export default GlobalStyle;
