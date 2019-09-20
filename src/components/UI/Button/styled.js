import styled, { css } from 'styled-components';
import { darken, transparentize } from 'polished';

export const ButtonElement = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  ${props => props.theme.typography.button}
  color: ${props =>
    props.color
      ? props.theme.palette.getContrastText(
          props.theme,
          props.theme.palette[props.color],
        )
      : props.theme.palette.text};
  text-decoration: none;
  background: ${props =>
    props.color
      ? props.theme.palette[props.color]
      : props.theme.palette.grey.grey300};
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
    background: ${props =>
      darken(
        0.1,
        props.color
          ? props.theme.palette[props.color]
          : props.theme.palette.grey.grey300,
      )};
  }
  ${props =>
    props.outline &&
    css`
      color: ${props.theme.palette[props.color || 'text']};
      background: ${props.theme.palette.white};
      border-color: ${props.color
        ? props.theme.palette[props.color]
        : props.theme.palette.grey.grey300};
      &:hover {
        background: ${props.color
          ? transparentize(0.9, props.theme.palette[props.color])
          : props.theme.palette.grey.grey100};
      }
    `}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: default;

      &:hover {
        background: ${props.theme.palette[props.color]};
      }
    `}

  svg + span {
    margin-left: ${props => props.theme.spacing(1)};
  }
`;
