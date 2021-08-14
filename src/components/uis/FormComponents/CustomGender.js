import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

// TODO: Need to move Global Styles
// and make it much simpler
const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const CustomGender = ({ entry, getValue }) => {
  const { value, name, label, values } = entry;
  const [newValue, setNewValue] = useState(value);
  const handleChange = e => {
    setNewValue(e.target.value);
    if (typeof getValue === 'function') {
      getValue(e.target.name, e.target.value);
    }
  };
  return (
    <Grid item xs={6}>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        row
        defaultValue={values[0].toLowerCase()}
        value={newValue}
        name={name}
        onChange={handleChange}
      >
        <FormControlLabel
          value={values[0].toLowerCase()}
          control={<StyledRadio />}
          label={values[0]}
        />

        <FormControlLabel
          value={values[1].toLowerCase()}
          control={<StyledRadio />}
          label={values[1]}
        />
      </RadioGroup>
    </Grid>
  );
};

export default CustomGender;
