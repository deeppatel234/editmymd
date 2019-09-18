import styled, { keyframes, css } from 'styled-components';
import { transparentize } from 'polished';

const blowUpModal = keyframes`

  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const BodyWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    transparentize(0.6, props.theme.palette.grey.grey500)};
  animation: ${fadeIn} 0.3s;

  &.model-body-animation-exit {
    opacity: 1;
  }

  &.model-body-animation-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  max-width: 80%;
  max-height: 80%;
  background-color: ${props => props.theme.palette.white};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${blowUpModal} 0.3s;

  &.model-animation-exit {
    transform: scale(1);
  }

  &.model-animation-exit-active {
    transform: scale(0);
    transition: transform 300ms;
  }
  ${props =>
    props.theme.breakpoints.lessThan(props.theme.breakpoints.sm)(css`
      min-width: 90%;
    `)}
  ${props =>
    props.theme.breakpoints.between(
      props.theme.breakpoints.sm,
      props.theme.breakpoints.md,
    )(css`
      min-width: 70%;
    `)}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(2, 2.5)};
  border-bottom: 1px solid ${props => props.theme.palette.grey.grey300};

  .close-btn {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing(2)};
  overflow: auto;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: ${props => props.theme.spacing(1, 2.5, 2, 2.5)};

  button {
    margin-left: ${props => props.theme.spacing(2)};
  }
`;
