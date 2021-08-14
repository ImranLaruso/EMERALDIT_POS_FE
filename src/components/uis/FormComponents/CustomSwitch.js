import React from 'react';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 7,
    margin: theme.spacing(1),
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    boxShadow:
      '0 0 12px 0 rgba(0,0,0,0.08), 0 0 8px 0 rgba(0,0,0,0.12), 0 0 4px 0 rgba(0,0,0,0.38)',
  },
  switchBase: {
    color: 'rgba(0,0,0,0.38)',
    padding: 7,
  },
  track: {
    borderRadius: 20,
    backgroundColor: '#90a4ae',
  },
  checked: {
    '& $thumb': {
      backgroundColor: '#fff',
    },
    '& + $track': {
      opacity: '1 !important',
    },
  },
}));

const CustomSwitch = ({ entry, getValue }) => {
  const { name, label, checked } = entry;
  const [switched, setSwitched] = React.useState(checked);
  const classes = useStyles();
  const handleChange = e => {
    setSwitched(e.target.checked);
    if (typeof getValue === 'function') {
      getValue(e.target.name, e.target.checked);
    }
  };
  return (
    <Grid item xs={6}>
      <FormLabel component='legend'>{label}</FormLabel>
      <Switch
        defaultChecked={false}
        color='primary'
        classes={classes}
        checked={switched}
        name={name}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default CustomSwitch;
