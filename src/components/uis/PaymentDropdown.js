import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import useStyles from '../../styles/useStyles';

const PaymentDropdown = ({ paymentType, handlePaymentMethod }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.paymentdropDown}>
      <InputLabel id='payment-method-input'>Payment Method</InputLabel>
      <Select
        labelId='Payment Method'
        id='payment-method-dropdown'
        value={paymentType}
        onChange={handlePaymentMethod}
      >
        <MenuItem value={'cash'}>Cash</MenuItem>
        <MenuItem value={'due'}>Due</MenuItem>
        <MenuItem value={'card'}>Card</MenuItem>
        <MenuItem value={'cheque'}>Cheque</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PaymentDropdown;
