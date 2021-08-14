import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import gridUseStyles from '../../../../styles/dashboard/gridUseStyles';

export default function GridContainer(props) {
  const classes = gridUseStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
