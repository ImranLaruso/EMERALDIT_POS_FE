import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getSupplierTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { fetchApi } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import { getSupplierList, searchSupplier } from '../../http/supplierApi';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle.js';
import { toast } from 'react-toastify';
import {
  selectSupplierList,
  selectAllSupplierList,
} from '../../store/selectors/supplierSelector.js';
import {
  setSupplierList,
  setAllSupplierList,
} from '../../store/actions/supplierActions.js';
import { getFormattedSupplierList } from '../../utilities/helpers/supplierHelpers.js';

const Suppliers = () => {
  const { location, push } = useHistory();
  const [suggestions, setSuggestions] = useState([]);
  const [fetchSuppliers, setFetchSuppliers] = useState(false);
  const classes = useStyles();

  const supplierList = useSelector(selectSupplierList);
  const allSupplierList = useSelector(selectAllSupplierList);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetSupplierResp = res => {
      dispatch(fetchApi(false));
      if (Array.isArray(res.data)) {
        const displaySupplierList = getFormattedSupplierList(res.data);
        dispatch(setSupplierList(displaySupplierList));
        dispatch(setAllSupplierList(displaySupplierList));
      }
    };

    const handleGetSupplierErr = _err => {
      toast.error('Unable to get suppliers');
      dispatch(fetchApi(false));
    };

    dispatch(fetchApi(true));
    getSupplierList()
      .then(handleGetSupplierResp)
      .catch(handleGetSupplierErr);
  }, [dispatch]);

  const handleEdit = supplier => {
    const editClick = () => {
      push(`${location.pathname}/edit/${supplier.id}`);
    };
    return editClick;
  };

  const handleSearchSubmit = (_e, value) => {
    if (value) {
      dispatch(
        setSupplierList(supplierList.filter(sup => sup.id === value.id))
      );
    } else {
      dispatch(setSupplierList(allSupplierList));
    }
  };

  const searchSuccess = res => {
    setFetchSuppliers(false);
    console.log(res.data);
    if (Array.isArray(res.data)) {
      setSuggestions(res.data);
      dispatch(setSupplierList(getFormattedSupplierList(res.data)));
    }
  };

  const searchErr = () => {
    toast.error('Unable to search suppliers');
    setFetchSuppliers(false);
  };

  const handleSearchChange = e => {
    setFetchSuppliers(true);
    const searchValue = e.target.value.trim();

    if (searchValue.length) {
      searchSupplier(searchValue)
        .then(searchSuccess)
        .catch(searchErr);
    } else {
      dispatch(setSupplierList(allSupplierList));
    }
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id="customer search-item-search"
          getOptionLabel={option => `${option.firstName}-${option.lastName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          loading={fetchSuppliers}
          noOptionsText={'No suppliers found'}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter a Supplier Name or Id"
              variant="outlined"
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <Fragment>
                    {fetchSuppliers && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Suppliers" createNewPath="suppliers" />
      {searchComponent}
      <TableBuilder
        tableData={supplierList}
        tableHeaders={getSupplierTableHeaders}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Suppliers;
