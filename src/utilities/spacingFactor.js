export default theme => {
  const { sm, md } = theme.breakpoints;
  if (window.matchMedia(`(max-width: ${sm})`).matches) {
    return 4;
  }
  if (window.matchMedia(`(min-width: ${sm}) and (max-width: ${md})`).matches) {
    return 6;
  }
  return 8;
};
