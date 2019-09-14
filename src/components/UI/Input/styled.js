import styled, { css } from 'styled-components';

export const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const AffixWrapper = styled.span`
  position: absolute;
  top: 50%;
  line-height: 0;
  transform: translateY(-50%);

  ${props =>
    props.left &&
    css`
      left: 10px;
    `}

  ${props =>
    props.right &&
    css`
      right: 10px;
    `}
`;

export const InputEle = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 0.8rem;
  border: 1px solid ${props => props.theme.palette.grey.grey300};
  border-radius: 5px;
  outline: none;

  ${props =>
    props.suffix &&
    css`
      padding-right: 30px;
    `}

  ${props =>
    props.prefix &&
    css`
      padding-left: 30px;
    `}

  ${props =>
    props.block &&
    css`
      width: 100%;
    `}

  ${props =>
    props.status &&
    css`
      border-color: ${props.theme.palette[props.status]};
    `}
`;
