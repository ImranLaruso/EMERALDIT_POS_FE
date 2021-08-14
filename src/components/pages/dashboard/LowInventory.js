import React from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../services/routeService';
import useStyles from '../../../styles/useStyles';

const LowInventory = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.lowInventory);
  };
  return (
    <div className={classes.miniTableViewContainer} onClick={onClick}>
      <table className={classes.miniTableViewTable}>
        <th>Item Id</th>
        <th>Item</th>
        <th>Quantity</th>
        <tr>
          <td>0011</td>
          <td>Soap - Sunlight</td>
          <td>2</td>
        </tr>
        <tr>
          <td>0033</td>
          <td>Ice Cream Cone</td>
          <td>3</td>
        </tr>
        <tr>
          <td>0065</td>
          <td>Paper Serviette</td>
          <td>2</td>
        </tr>
        <tr>
          <td>0021</td>
          <td>Washing Powder - Large</td>
          <td>3</td>
        </tr>
        <tr>
          <td>0019</td>
          <td>40 pg books - single rule</td>
          <td>5</td>
        </tr>
      </table>
    </div>
  );
};

export default LowInventory;
