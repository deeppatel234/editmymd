import styled, { css } from 'styled-components';

export const DIRECTIONS = {
  top: 'column',
  left: 'row',
};

export const Wrapper = styled.div`
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  align-items: start;
  margin: ${props => props.theme.spacing(1)};
  ${props => `flex-direction: ${DIRECTIONS[props.labelTextPlacement]};`}
  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `}

  .form-label {
    margin-right: ${props => props.theme.spacing(1)};
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
    vertical-align: middle;
    ${props =>
      props.required &&
      css`
        &::after {
          display: inline-block;
          margin: ${props.theme.spacing(1)};
          color: ${props.theme.palette.error};
          font-weight: normal;
          font-size: 1.3em;
          line-height: 1;
          content: '*';
        }
      `}
  }

  .form-help-text {
    line-height: 2;
  }
`;

export const ChildWrapper = styled.div`
  ${props =>
    props.block &&
    css`
      flex: 1;
      width: 100%;
    `};
`;
