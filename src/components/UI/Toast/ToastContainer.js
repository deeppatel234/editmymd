import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import eventManager from './eventManager';

import { ACTION, POSITION } from './constants';
import { ToastWrapper } from './styled';

import ToastAlert from './ToastAlert';

const domElement = document.getElementById('portal') || document.body;

class ToastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };

    this.timers = {};

    this.onClickRemove = this.onClickRemove.bind(this);
  }

  componentDidMount() {
    eventManager.on(ACTION.SHOW, this.addSiteToast.bind(this));
  }

  componentWillUnmount() {
    eventManager.off(ACTION.SHOW);
  }

  onClickRemove(event) {
    const { toastId } = event.target.dataset;
    if (toastId in this.timers) {
      clearTimeout(this.timers[toastId]);
      delete this.timers[toastId];
    }
    this.removeSiteToast(toastId);
  }

  removeSiteToast(toastId) {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(t => t.options.id !== toastId),
    }));
  }

  addSiteToast(content, options) {
    if (this.props.position === options.position) {
      this.setState(
        prevState => ({
          toasts: [...prevState.toasts, { content, options }],
        }),
        () => {
          if (options.autoClose) {
            this.timers[options.id] = setTimeout(
              () => this.removeSiteToast(options.id),
              options.duration,
            );
          }
        },
      );
    }
  }

  render() {
    const { toasts } = this.state;
    const { position, children } = this.props;

    return ReactDOM.createPortal(
      <ToastWrapper position={position} className={`position-${position}`}>
        <TransitionGroup>
          {toasts.map(({ content, options }) => {
            const params = {
              content,
              key: options.id,
              options,
              onClickRemove: this.onClickRemove,
            };
            return (
              <CSSTransition
                key={options.id}
                timeout={500}
                classNames="item"
                onExited={options.onClose}
              >
                {children ? children(params) : <ToastAlert {...params} />}
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ToastWrapper>,
      domElement,
    );
  }
}

ToastContainer.POSITION = POSITION;

ToastContainer.defaultProps = {
  position: POSITION.TOP_RIGHT,
};

ToastContainer.propTypes = {
  position: PropTypes.string,
};

export default ToastContainer;
