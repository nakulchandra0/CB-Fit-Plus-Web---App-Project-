import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoadingSpinner = props => (
  <Dimmer active={props.dimmerActive} inverted={props.dimmerInverted}>
    <Loader
      inline={props.inline}
      size={props.size}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
    >
      {props.message}
    </Loader>
  </Dimmer>
);

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  inline: PropTypes.string,
  message: PropTypes.string,
  dimmerActive: PropTypes.bool,
  dimmerInverted: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default LoadingSpinner;
