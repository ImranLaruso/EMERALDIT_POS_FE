import React from 'react';
import useStyles from '../../../styles/useStyles';
import { Card } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SaleDueDatePicker from './SaleDueDate';

const PaymentMethodsInfo = ({
  paymentMethods,
  setPaymentMethod,
  handleDueDateChange,
  dueDate,
}) => {
  const classes = useStyles();

  const handleDelete = i => {
    const deletePaymentMethod = () => {
      paymentMethods.splice(i, 1);
      console.log(paymentMethods);
      setPaymentMethod([...paymentMethods]);
    };
    return deletePaymentMethod;
  };
  return (
    <Card className={classes.cardSales}>
      <div>
        {paymentMethods.map((row, i) => {
          return (
            <div className={classes.salesPaymentTypeContainer} key={`row-${i}`}>
              <div className={classes.removePaymentTypeIcon}>
                <RemoveCircleIcon
                  onClick={handleDelete(i)}
                  className={classes.materialIcon}
                />
              </div>
              <div className={classes.salesPayContainerRow}>
                <div className={classes.salesPayContainerRowAmount}>
                  {row.type}
                  {row.type === 'due' && (
                    <SaleDueDatePicker
                      handleDueDateChange={handleDueDateChange}
                      dueDate={dueDate}
                    />
                  )}
                  <div>{row.amount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PaymentMethodsInfo;
