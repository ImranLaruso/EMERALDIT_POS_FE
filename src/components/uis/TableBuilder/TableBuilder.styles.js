import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableContainer, TableRow } from '@material-ui/core';

export const BuilderTableContainer = styled(TableContainer)`
  min-height: 400px;
`;

export const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: ${({ lowStock }) => (lowStock ? 'yellow' : 'inherit')};
  &&:hover {
    background-color: ${({ lowStock }) => (lowStock ? 'yellow' : 'inherit')};
  }
`;
