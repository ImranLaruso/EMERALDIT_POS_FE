import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  BuilderTableContainer,
  StyledEditIcon,
  StyledDeleteIcon,
  StyledTableRow,
} from './TableBuilder.styles';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headers.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {},
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function TableBuilder({
  tableData: rows,
  tableHeaders: headers,
  handleEdit,
  hidePagination,
  tableRows,
  hideEditIcon,
  payButton,
  payButtonClick,
  densed,
  noOfRowsPerPage = 15,
  handleDelete,
}) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('outstanding');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(noOfRowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <BuilderTableContainer component={Paper}>
        <Table className={classes.table} size={densed ? 'small' : 'medium'}>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headers={headers}
          />
          <TableBody>
            {tableRows ||
              stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      lowStock={row.lowStock}
                    >
                      {Object.values(row).map((cell, index) => {
                        return <TableCell key={index}>{cell}</TableCell>;
                      })}
                      {payButton && (
                        <TableCell key={'payButton'}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={payButtonClick(row)}
                          >
                            Pay
                          </Button>
                        </TableCell>
                      )}
                      {!hideEditIcon && (
                        <TableCell
                          key={'edit'}
                          align="right"
                          padding="checkbox"
                        >
                          <StyledEditIcon onClick={handleEdit(row)} />
                        </TableCell>
                      )}
                      {handleDelete && (
                        <TableCell
                          key={'delete'}
                          align="right"
                          padding="checkbox"
                        >
                          <StyledDeleteIcon onClick={handleDelete(row)} />
                        </TableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </BuilderTableContainer>
      {!hidePagination && (
        <TablePagination
          rowsPerPageOptions={[
            rowsPerPage + 5,
            rowsPerPage + 10,
            rowsPerPage + 15,
          ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}
