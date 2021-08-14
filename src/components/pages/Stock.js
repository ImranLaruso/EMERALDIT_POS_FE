import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder.js';
import { getStockTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { fetchApi } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle.js';
import { toast } from 'react-toastify';
import { getStockPerItem } from '../../http/stockApi.js';
import { getFormattedStockList } from '../../utilities/helpers/stockHelpers.js';
import { setStockList } from '../../store/actions/stockActions.js';
import { selectAllStockList } from '../../store/selectors/stockSelector.js';
import { Box, TextField, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Stock = () => {
  const classes = useStyles();

  const allStockList = useSelector(selectAllStockList);
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const handleGetStockResp = res => {
      dispatch(fetchApi(false));
      if (Array.isArray(res.data)) {
        const dispalyStockList = getFormattedStockList(res.data);
        dispatch(setStockList(dispalyStockList));
      }
    };

    const handleGetStockErr = _err => {
      toast.error('Unable to get stock');
      dispatch(fetchApi(false));
    };

    dispatch(fetchApi(true));
    getStockPerItem(searchWord)
      .then(handleGetStockResp)
      .catch(handleGetStockErr);
  }, [dispatch, searchWord]);

  const handleSearchChange = e => {
    setSearchWord(e.target.value);
  };

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Stock" />
      <Box m="auto" width={'75%'}>
        <Grid item xs={9}>
          <TextField
            autoFocus
            fullWidth
            label={`Enter an item code to search`}
            variant="outlined"
            value={searchWord}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Grid>
      </Box>
      <TableBuilder
        tableData={allStockList}
        tableHeaders={getStockTableHeaders}
        hideEditIcon
      />
    </div>
  );
};

export default Stock;
