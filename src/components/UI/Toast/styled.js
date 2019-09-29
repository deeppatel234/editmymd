import styled, { css } from 'styled-components';
import { POSITION } from './constants';

const positionCss = {
  [POSITION.TOP_CENTER]: {
    enter: 'translate3d(0, -100%, 0)',
    exit: 'translate3d(0, -100%, 0)',
    position: {
      top: '1em',
      right: '50%',
    },
  },
  [POSITION.TOP_LEFT]: {
    enter: 'translate3d(-100%, 0, 0)',
    exit: 'translate3d(-110%, 0, 0)',
    position: {
      top: ' 1em',
      left: '2%',
    },
  },
  [POSITION.TOP_RIGHT]: {
    enter: 'translate3d(100%, 0, 0)',
    exit: 'translate3d(100%, 0, 0)',
    position: {
      top: '1em',
      right: '2%',
    },
  },
  [POSITION.BOTTOM_CENTER]: {
    enter: 'translate3d(0, 100%, 0)',
    exit: 'translate3d(0, 100%, 0)',
    position: {
      right: '50%',
      bottom: '1em',
    },
  },
  [POSITION.BOTTOM_LEFT]: {
    enter: 'translate3d(-100%, 0, 0)',
    exit: 'translate3d(-110%, 0, 0)',
    position: {
      top: ' 1em',
      left: '2%',
    },
  },
  [POSITION.BOTTOM_RIGHT]: {
    enter: 'translate3d(100%, 0, 0)',
    exit: 'translate3d(100%, 0, 0)',
    position: {
      right: '2%',
      bottom: '1em',
    },
  },
};

export const Toast = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
  margin: 10px 0;
  padding: 15px 20px;
  color: ${props =>
    props.theme.palette.getContrastText(
      props.theme,
      props.theme.palette[props.type],
    )};
  background: ${props => props.theme.palette[props.type]};
  border-radius: 5px;
`;

export const Remove = styled.span`
  padding: 0 5px;
  cursor: pointer;
`;

export const ToastWrapper = styled.div`
  position: fixed;
  z-index: 800;
  ${props =>
    css`
      &.position-${props.position} {
        ${positionCss[props.position].position}
      }
    `};

  .item-enter {
    transform: ${props => positionCss[props.position].enter};
    visibility: hidden;
  }

  .item-enter-active {
    transform: translate3d(0, 0, 0);
    visibility: visible;
    transition: all 0.4s;
  }

  .item-exit {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  .item-exit-active {
    transform: ${props => positionCss[props.position].exit};
    visibility: hidden;
    transition: all 0.4s;
  }
`;
