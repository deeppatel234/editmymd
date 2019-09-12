import styled, { css } from 'styled-components';
import { darken, transparentize } from 'polished';

export const ButtonElement = styled.button`
  padding: 6px 16px;
  ${props => props.theme.typography.button}
  color: ${props =>
    props.theme.palette.getContrastText(props.theme, props.color)};
  background: ${props => props.theme.palette[props.color]};
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  ${props =>
    props.block &&
    css`
      width: 100%;
    `}
  ${props =>
    props.size === 'small' &&
    css`
      padding: '4px 8px';
      font-size: ${props.theme.typography.pxToRem(13)};
    `}
  ${props =>
    props.size === 'large' &&
    css`
      padding: '8px 24px';
      font-size: ${props.theme.typography.pxToRem(15)};
    `}
  &:hover {
    background: ${props => darken(0.1, props.theme.palette[props.color])};
  }
  ${props =>
    props.outline &&
    css`
      color: ${props.theme.palette[props.color]};
      background: ${props.theme.palette.white};
      border-color: ${props.theme.palette[props.color]};
      &:hover {
        background: ${transparentize(0.9, props.theme.palette[props.color])};
      }
    `}
`;

export const LoaderWrapper = styled.span`
  margin-right: 7px;
`;
