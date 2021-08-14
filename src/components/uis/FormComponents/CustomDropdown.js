import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import useStyles from '../../../styles/useStyles.js';

const CustomDropdown = ({ entry, getValue, hidden }) => {
  const { values, name, id, label, helperText, error } = entry;
  const classes = useStyles();
  const [value, setValue] = React.useState(values[0].value);

  const handleChange = event => {
    if (typeof getValue === 'function') {
      getValue(event.target.name, event.target.value);
      setValue(event.target.value);
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <Grid item xs={6}>
      <FormControl className={classes.dropdownControl}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={value}
          onChange={handleChange}
          name={name}
        >
          {values.map(({ key, value }) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default CustomDropdown;
