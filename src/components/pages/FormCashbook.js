import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { useTheme } from '@material-ui/core/styles';
import {
  getCashbookFormData,
  getCashbookFormDataForDue,
} from '../../utilities/helpers/formHelpers/cashbookForm';
import { createCashbook } from '../../http/cashbookApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi } from '../../store/actions/globalAction';
import { Tab, AppBar, Tabs } from '@material-ui/core';
import { getDuesByCustomerId } from '../../http/dueApi';
import { getCustomerById } from '../../http/customerApi';
import TabPanel from '../uis/FormComponents/TabPanel';
import { toast } from 'react-toastify';

const FormCashbook = ({ fetchApi }) => {
  const { customerId } = useParams();
  const { push } = useHistory();
  const [cashbook, setCashbook] = useState({
    type: 'DEBIT',
    refNo: 1,
    description: 'DUE_PAYMENT',
    amount: 0,
  });
  const theme = useTheme();
  const [tabPanelValue, setTabPanelValue] = React.useState('DEBIT');
  const [customerDataWithValues, setCustomerDataWithValues] = useState([]);

  useEffect(() => {
    if (customerId) {
      const handleGetCustomerDuesSuccess = dueData => {
        getCustomerById(customerId)
          .then(res => handleGetCustomerByIdSuccess(res, dueData))
          .catch(handleGetCustomerByIdErr);
      };
      const handleGetCustomerDuesErr = () => {
        fetchApi(false);
      };
      const handleGetCustomerByIdSuccess = (customerData, dueData) => {
        const cusData = {
          ...customerData.data,
          amount: dueData.data,
        };
        fetchApi(false);
        const cashBookFormDataWithCustomerValues = [];
        Object.keys(cusData).forEach(id => {
          getCashbookFormDataForDue.forEach(entry => {
            if (id === entry.id) {
              cashBookFormDataWithCustomerValues.push({
                ...entry,
                value: cusData[`${id}`],
              });
            }
            return null;
          });
        });
        setCustomerDataWithValues([...cashBookFormDataWithCustomerValues]);
      };
      const handleGetCustomerByIdErr = () => {
        fetchApi(false);
      };

      fetchApi(true);
      getDuesByCustomerId(customerId)
        .then(handleGetCustomerDuesSuccess)
        .catch(handleGetCustomerDuesErr);
    }
  }, [customerId, fetchApi]);

  const handleCreateNewCashbook = newCashbook => {
    const handleCreateSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
      toast.success('Succuessfully created');
    };
    const handleCreateErr = err => {
      fetchApi(false);
      toast.error('Unable to create cashbook');
    };
    fetchApi(true);
    createCashbook(newCashbook)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleChange = (_event, newValue) => {
    setTabPanelValue(newValue);
    setCashbook({ ...cashbook, type: newValue });
  };

  const actor = { ...cashbook };
  const cashbookForm = (
    <FormBuilder
      title={'Create new Cashbook'}
      data={
        customerId && tabPanelValue === 'DEBIT'
          ? customerDataWithValues
          : getCashbookFormData
      }
      onClick={handleCreateNewCashbook}
      actor={actor}
    />
  );

  if (customerId) {
    return cashbookForm;
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tabPanelValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Debit" value="DEBIT" />
          <Tab label="Credit" value="CREDIT" />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={tabPanelValue} index={'CREDIT'} dir={theme.direction}>
          {cashbookForm}
        </TabPanel>
        <TabPanel value={tabPanelValue} index={'DEBIT'} dir={theme.direction}>
          {cashbookForm}
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(FormCashbook);
