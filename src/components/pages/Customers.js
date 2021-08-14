import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder';
import { useHistory } from 'react-router-dom';
import {
  getCustomerTableHeaders,
  getDueCustomerTableHeaders,
} from '../../utilities/helpers/tableHelpers.js';
import { getCustomerList, searchCustomer } from '../../http/customerApi';
import { fetchApi } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import {
  TextField,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle';
import { toast } from 'react-toastify';

const Customers = ({ fetchApi }) => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchCustomers, setFetchCustomers] = useState(false);
  const [isCreditCustomers, setIsCreditCustomers] = useState(false);
  const classes = useStyles();

  const handleGetCustomerResp = useCallback(
    res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayCustomerList = getFormattedList(res.data);
        setCustomerList(displayCustomerList);
      }
    },
    [fetchApi]
  );

  const handleGetCustomerErr = useCallback(_err => {
    toast.error('Unable to get customers');
  }, []);

  useEffect(() => {
    fetchApi(true);
    getCustomerList().then(handleGetCustomerResp).catch(handleGetCustomerErr);
  }, [fetchApi, handleGetCustomerErr, handleGetCustomerResp]);

  const handleEdit = customer => {
    const editClick = () => {
      push(`${location.pathname}/edit/${customer.id}`);
    };
    return editClick;
  };

  const handleSearchSubmit = (_e, value) => {
    const handleGetCustomerByIdSuccess = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayCustomerList = getFormattedList(res.data);
        setCustomerList(displayCustomerList);
      }
    };
    const handleGetCustomerByIdErr = _err => {
      toast.error('Unable to filter customer detail');
      fetchApi(false);
    };
    if (value) {
      searchCustomer(value.id)
        .then(handleGetCustomerByIdSuccess)
        .catch(handleGetCustomerByIdErr);
    }
  };
  const handleCreditCustomersToggler = e => {
    setIsCreditCustomers(e.target.checked);
  };

  const handleSearchChange = e => {
    const searchSuccess = res => {
      setFetchCustomers(false);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
        const displayCustomerList = getFormattedList(res.data);
        setCustomerList(displayCustomerList);
      }
    };

    const searchErr = () => {
      toast.error('Unable to search customers');
    };

    const trimmedValue = e.target.value.trim();

    if (trimmedValue.length) {
      setFetchCustomers(true);
      searchCustomer(trimmedValue).then(searchSuccess).catch(searchErr);
    } else {
      getCustomerList().then(handleGetCustomerResp).catch(handleGetCustomerErr);
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
          loading={fetchCustomers}
          noOptionsText={'No customers found'}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter a Customer name or Id"
              variant="outlined"
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <Fragment>
                    {fetchCustomers && (
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
  let customerTableData;
  if (isCreditCustomers) {
    customerTableData = customerList.filter(({ dueTotal }) => dueTotal > 0);
    customerTableData = customerTableData.map(
      ({ id, firstName, lastName, phoneNo, dueTotal }, index) => {
        return { id, firstName, lastName, phoneNo, dueTotal };
      }
    );
  } else {
    customerTableData = customerList.map(
      ({ id, firstName, lastName, phoneNo }, index) => {
        return { id, firstName, lastName, phoneNo };
      }
    );
  }
  const handlePayButttonClick = customer => {
    const handlePayClick = () => {
      push(`/cashbooks/payCustomerDue/${customer.id}`);
    };
    return handlePayClick;
  };

  return (
    <Fragment>
      <div className={classes.pageContainer}>
        <PageTitle title="Customers" createNewPath="customers" />
        {searchComponent}
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={isCreditCustomers}
                onChange={handleCreditCustomersToggler}
                name="credit-customer-toggler"
              />
            }
            value={isCreditCustomers}
            label="Show Credit Customers"
            labelPlacement="start"
          />
        </div>

        <TableBuilder
          tableData={customerTableData}
          tableHeaders={
            isCreditCustomers
              ? getDueCustomerTableHeaders
              : getCustomerTableHeaders
          }
          handleEdit={handleEdit}
          payButton={isCreditCustomers}
          payButtonClick={handlePayButttonClick}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(Customers);

const getFormattedList = data =>
  data.map(({ id, firstName, lastName, phoneNo, dueTotal }) => {
    return { id, firstName, lastName, phoneNo, dueTotal };
  });
