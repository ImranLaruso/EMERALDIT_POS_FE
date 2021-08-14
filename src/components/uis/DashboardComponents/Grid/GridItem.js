import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import gridUseStyles from '../../../../styles/dashboard/gridUseStyles';

export default function GridItem(props) {
  const classes = gridUseStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.gridPadding}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
