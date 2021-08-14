import React from 'react';
import { Card, Button, TextField, InputAdornment } from '@material-ui/core';
import useStyles from '../../../../styles/useStyles';
import { PAYMENT_METHODS, CURRENCY } from '../../../../utilities/constants';
import SaleDueDatePicker from '../SaleDueDate';
import { ErrorAddSubmit } from './PaymentMethodSelection.styles';

const PaymentMethodSelection = ({
  handlePaymentMethod,
  paymentMethod,
  handleAddSubmit,
  handlePayAmount,
  payAmount,
  buttonDisabled,
  buttonName,
  handleDueDateChange,
  dueDate,
  addSubmitError,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardSales}>
      <div className={classes.paymentMethodSelection}>
        <div className={classes.paymentMethodButtons}>
          {PAYMENT_METHODS.map(method => (
            <Button
              key={method}
              variant={paymentMethod === method ? 'contained' : 'text'}
              color="secondary"
              onClick={() => handlePaymentMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>
        <div className={classes.paymentMethodDueView}>
          {paymentMethod === 'due' && (
            <SaleDueDatePicker
              handleDueDateChange={handleDueDateChange}
              dueDate={dueDate}
            />
          )}
        </div>
      </div>
      <div>
        <form onSubmit={handleAddSubmit} className={classes.addSubmitPayment}>
          <TextField
            id="sales-payment-amount"
            variant="outlined"
            type="text"
            label="Payment Amount"
            placeholder="Add Payment Amount"
            className={classes.salesAddAmount}
            onChange={handlePayAmount}
            onFocus={e => e.target.select()}
            value={payAmount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{CURRENCY}</InputAdornment>
              ),
            }}
          />
          {addSubmitError ? (
            <ErrorAddSubmit>{addSubmitError}</ErrorAddSubmit>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
            className={classes.salesAddPayAmountButton}
          >
            {buttonName}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default PaymentMethodSelection;
