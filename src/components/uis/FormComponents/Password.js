import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import useStyles from '../../../styles/useStyles';

const CustomPassword = ({ onChange, value, label }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      className={classes.loginGridField}
      alignItems='flex-end'
    >
      <Grid item className={classes.loginFormFieldIcon}>
        <LockOpenIcon />
      </Grid>
      <Grid item className={classes.loginFormField}>
        <TextField
          className={classes.loginputField}
          id={label}
          xs={3}
          label={label}
          type='password'
          name={label}
          onChange={onChange}
          value={value}
        />
      </Grid>
    </Grid>
  );
};

export default CustomPassword;
