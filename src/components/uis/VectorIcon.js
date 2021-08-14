import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const VectorIcon = props => {
  return (
    <i
      className={classnames(`icon-${props.name}`, {
        [`animate-${props.animation}`]: !!props.animation,
      })} style={{fontSize: "80px"}}
    />
  );
};

VectorIcon.propType = {
  name: PropTypes.string.isRequired,
  animation: PropTypes.oneOf(['spin']),
};

VectorIcon.defaultProps = {
  name: 'play',
  animation: null,
};

export default VectorIcon;
