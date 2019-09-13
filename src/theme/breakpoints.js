import { css } from 'styled-components';

const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

const validateBreakpoint = breakpointValue => {
  if (parseInt(breakpointValue, 10)) {
    return breakpointValue;
  }
  console.error(
    'styled-media-query: No valid breakpoint or size specified for media.',
    breakpointValue,
  );
  return '0';
};

export const lessThan = breakpoint => (...args) => css`
  @media (max-width: ${validateBreakpoint(breakpoint)}) {
    ${css(...args)}
  }
`;

export const greaterThan = breakpoint => (...args) => css`
  @media (min-width: ${validateBreakpoint(breakpoint)}) {
    ${css(...args)}
  }
`;

export const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
  @media (min-width: ${validateBreakpoint(
      firstBreakpoint,
    )}) and (max-width: ${validateBreakpoint(secondBreakpoint)}) {
    ${css(...args)}
  }
`;

export default { ...breakpoints, lessThan, greaterThan, between };
