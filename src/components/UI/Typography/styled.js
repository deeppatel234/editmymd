import styled, { css } from 'styled-components';

export const Element = styled.p`
  margin: 0;
  ${props => props.theme.typography[props.variant]}
  ${props =>
    props.truncate &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  ${props =>
    props.color &&
    css`
      color: ${props.theme.palette[props.color]};
    `}
  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${props =>
    props.display &&
    css`
      display: ${props.display};
    `}
  ${props =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
  ${props =>
    props.center &&
    css`
      display: flex;
      align-items: center;
    `}
`;

export default Element;
