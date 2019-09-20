export default theme => {
  const { sm } = theme.breakpoints;
  if (window.matchMedia(`(max-width: ${sm})`).matches) {
    return 6;
  }
  return 8;
};
