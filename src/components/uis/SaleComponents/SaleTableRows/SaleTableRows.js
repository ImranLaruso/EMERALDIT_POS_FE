import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TableRow, TableCell, TextField } from '@material-ui/core';
import { RemoveRowIcon } from './SaleTableRows.styles';
import { setSaleCartItems } from '../../../../store/actions/saleActions';
import { selectSaleCartItems } from '../../../../store/selectors/saleSelector';

const SaleTableRows = ({
  updateDisplayTotal,
  handleKeyDown,
  getItemTotal,
  row,
  rowIndex,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectSaleCartItems);

  const handleFocus = event => event.target.select();
  const editableRowIndexes = ['salesPrice', 'quantity', 'discount'];
  if (row.id) {
    const deleteClick = () => {
      cartItems.splice(rowIndex, 1);
      dispatch(setSaleCartItems([...cartItems]));
    };
    return (
      <TableRow hover key={`${rowIndex}+${row.id}`}>
        {Object.keys(row).map(cell => {
          row.total = getItemTotal(row);

          if (cell === 'itemStatId' || cell === 'stockQty' || cell === 'id') {
            return null;
          }

          if (editableRowIndexes.includes(cell)) {
            const handleTextInputChange = event => {
              const { value } = event.target;

              if (value >= 0) {
                if (cell === 'quantity') {
                  if (value > row['stockQty']) {
                    toast.error(
                      `Sorry only ${row['stockQty']} ${row['itemName']} available`
                    );
                    row[cell] = row['stockQty'];
                  } else {
                    row[cell] = value;
                  }
                } else {
                  row[cell] = value;
                }
                dispatch(setSaleCartItems([...cartItems]));
                updateDisplayTotal();
              }
            };
            return (
              <TableCell key={cell}>
                <TextField
                  id={cell}
                  name={cell}
                  onFocus={handleFocus}
                  autoFocus={cell === 'quantity'}
                  value={row[cell]}
                  onChange={handleTextInputChange}
                  onKeyDown={handleKeyDown(cell)}
                />
              </TableCell>
            );
          }
          return <TableCell key={cell}>{row[cell]}</TableCell>;
        })}
        <TableCell key={'delete'} align="right">
          <RemoveRowIcon onClick={deleteClick} />
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

export default SaleTableRows;
