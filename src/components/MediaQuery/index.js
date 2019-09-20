import { withTheme } from 'styled-components';

const MediaQuery = ({ lessThan, greaterThan, theme, children }) => {
  if (
    lessThan &&
    window.matchMedia(`(max-width: ${theme.breakpoints[lessThan]})`).matches
  ) {
    return children;
  }
  if (
    greaterThan &&
    window.matchMedia(`(min-width: ${theme.breakpoints[greaterThan]})`).matches
  ) {
    return children;
  }
  return null;
};

export default withTheme(MediaQuery);
