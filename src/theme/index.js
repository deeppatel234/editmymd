import typography from './typography';
import palette from './palette';
import shadows from './shadows';
import spacing from './spacing';
import zIndex from './zIndex';
import breakpoints from './breakpoints';
import GlobalStyle from './globalStyle';

const themeConfig = {
  typography,
  palette,
  shadows,
  spacing: spacing(),
  zIndex,
  breakpoints,
};

export { themeConfig, GlobalStyle };
