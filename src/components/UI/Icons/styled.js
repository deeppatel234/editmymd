import styled, { css } from 'styled-components';

export const IconSvg = styled.svg`
  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}
`;
