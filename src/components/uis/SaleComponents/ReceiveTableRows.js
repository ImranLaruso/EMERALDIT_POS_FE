import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableRow, TableCell, TextField } from '@material-ui/core';
import { RemoveRowIcon } from './SaleTableRows/SaleTableRows.styles';
import { selectReceiveCartItems } from '../../../store/selectors/receiveSelector';
import { setReceiveCartItems } from '../../../store/actions/receiveAction';

const ReceiveTableRows = ({ handleKeyDown, getItemTotal, row, rowIndex }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectReceiveCartItems);

  const handleFocus = event => event.target.select();

  const editableRowIndexes = ['receivePrice', 'quantity', 'discount'];

  if (row.id) {
    const deleteClick = () => {
      cartItems.splice(rowIndex, 1);
      dispatch(setReceiveCartItems([...cartItems]));
    };

    return (
      <TableRow hover key={`${rowIndex}+${row.id}`}>
        {Object.keys(row).map(cell => {
          row.total = getItemTotal(row);

          if (cell === 'id' || cell === 'salesPrice') {
            return null;
          }

          if (editableRowIndexes.includes(cell)) {
            const handleTextInputChange = event => {
              const { value } = event.target;
              if (value >= 0) {
                row[cell] = value;
                dispatch(setReceiveCartItems([...cartItems]));
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
                  onKeyDown={handleKeyDown}
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

export default ReceiveTableRows;
