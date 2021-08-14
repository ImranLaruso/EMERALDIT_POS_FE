import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import useStyles from '../../../styles/useStyles.js';

import { useTheme } from '@material-ui/styles';
const Dropdown = ({ entry, getValue }) => {
  const { value, name, id, label, helperText, error } = entry;
  const [duePayment, setDuePayment] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const totalDueAmount = (amount = 0) =>
    duePayment.reduce((a, b) => a + b.amount, amount);

  function getStyles(dueId) {
    const isSelected = duePayment.filter(due => due.id === dueId);
    return {
      fontWeight: isSelected.length ? 'bold' : 'normal',
    };
  }
  const handleChange = event => {
    let arrayIndex = -1;
    duePayment.forEach((due, index) => {
      if (due.id === event.target.value.id) {
        arrayIndex = index;
      }
    });
    console.log(arrayIndex);
    if (arrayIndex < 0) {
      setDuePayment([...duePayment, event.target.value]);
      event.target.value = totalDueAmount(event.target.value.amount);
    } else {
      duePayment.splice(arrayIndex, 1);
      setDuePayment([...duePayment]);
      event.target.value = totalDueAmount();
    }
    if (typeof getValue === 'function') {
      getValue(event.target.name, event.target.value);
    }
  };

  return (
    <Grid item xs={6}>
      <FormControl className={classes.dropdownControl}>
        <InputLabel id={label}>Due</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={duePayment}
          onChange={handleChange}
          input={<Input id='Select due' />}
          name={name}
          renderValue={selected => (
            <div className={classes.dropdownChips}>
              {selected.map(due => (
                <Chip
                  key={due.id}
                  label={`Rs. ${parseFloat(due.total).toFixed(2)}`}
                />
              ))}
            </div>
          )}
        >
          {value.map(value => (
            <MenuItem
              key={id}
              value={value}
              style={getStyles(value.id, duePayment, theme)}
            >
              {`pay due Rs. ${parseFloat(value.amount).toFixed(
                2
              )} on ${new Date(value.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}`}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};
export default Dropdown;
