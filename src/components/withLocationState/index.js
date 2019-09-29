import React from 'react';
import { Redirect } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

const DEFAULT_OPTIONS = {
  redirectToApp: true,
};

const withLocationState = (WrappedComponent, options = {}) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      const { state } = props.location;
      this.locationState = state || {};
      this.hasState = !_isEmpty(this.locationState);

      this.options = { ...DEFAULT_OPTIONS, ...options };
    }

    render() {
      if (this.options.redirectToApp && !this.hasState) {
        return <Redirect to="/" />;
      }

      return (
        <WrappedComponent locationState={this.locationState} {...this.props} />
      );
    }
  };
};

export default withLocationState;
