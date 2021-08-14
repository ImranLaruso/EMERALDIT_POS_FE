import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const CustomTextField = ({ entry, getValue }) => {
  const {
    label,
    name,
    icon,
    type,
    required,
    autoFocus,
    value,
    multiline,
    rows,
    id,
    helperText,
    error,
    readOnly,
  } = entry;
  const [newValue, setNewValue] = useState(value);

  const handleChange = e => {
    setNewValue(e.target.value);
    if (typeof getValue === 'function') {
      getValue(e.target.name, e.target.value);
    }
  };
  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        id={id}
        label={label}
        placeholder={label}
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        value={newValue}
        multiline={multiline}
        rows={rows}
        onChange={handleChange}
        error={error}
        helperText={error && helperText}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>{icon}</InputAdornment>
          ),
          readOnly,
        }}
      />
    </Grid>
  );
};
export default CustomTextField;
