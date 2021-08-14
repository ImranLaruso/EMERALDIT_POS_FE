import React from 'react';
import useStyles from '../../../styles/useStyles';
import { Card, Chip } from '@material-ui/core';
import { getLocalDate } from '../../../utilities/helpers/dateHelpers';

const SaleToolTip = ({ option }) => {
  const {
    salesPrice,
    quantity,
    costPrice,
    receivedDate,
    item: { itemName, itemCode, supplier },
  } = option;
  const classes = useStyles();

  const infoArray = [
    { key: 'Name', value: itemName },
    { key: 'Code', value: itemCode },
    { key: 'Qty', value: quantity },
    { key: 'Sale Price', value: salesPrice },
    { key: 'Cost Price', value: costPrice },
    { key: 'Supplier', value: supplier?.companyName },
    { key: 'Received Date', value: getLocalDate(receivedDate) },
  ];
  return (
    <Card className={classes.searchItemSuggestionBox}>
      {infoArray.map(({ key, value }) => (
        <Chip
          key={key}
          color="primary"
          label={
            <div className={classes.toolTipItemDisplay}>
              <div>{key}</div>:
              <div className={classes.toolTipValue}>{value}</div>
            </div>
          }
        />
      ))}
    </Card>
  );
};

export default SaleToolTip;
