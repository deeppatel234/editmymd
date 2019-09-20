import styled, { css } from 'styled-components';

export const DropDownWrapper = styled.div`
  position: relative;
  z-index: 800;
  display: inline-block;
`;

export const DropDownArea = styled.div`
  position: absolute;
  ${props =>
    props.position === 'right' &&
    css`
      left: 0;
    `};
  ${props =>
    props.position === 'left' &&
    css`
      right: 0;
    `};
  margin: ${props => props.theme.spacing(1, 0)};
  background: ${props => props.theme.palette.white};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${props =>
    !props.isOpen &&
    css`
      display: none;
    `}
`;
