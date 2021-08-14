import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder';
import { getCashbookTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCashbookList, getFilteredCashbooks } from '../../http/cashbookApi';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles/useStyles';
import { fetchApi } from '../../store/actions/globalAction.js';
import DatePicker from './../uis/FormComponents/DatePicker';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle';
import { getJSONDate, getLocalDate } from '../../utilities/helpers/dateHelpers';
import { toast } from 'react-toastify';

const Cashbooks = ({ fetchApi }) => {
  const classes = useStyles();
  const [cashbookList, setCashbookList] = useState([]);
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());
  const [selectedDateFrom, setSelectedDateFrom] = useState(
    new Date('2020-05-10T21:11:54')
  );

  useEffect(() => {
    const handleGetCashbookResp = res => {
      handleGetCashbookSuccues(fetchApi, res, setCashbookList);
    };
    const handleGetCashbookErr = err => {
      toast.error('Unable to get Cashbooks');
    };

    fetchApi(true);
    getCashbookList()
      .then(handleGetCashbookResp)
      .catch(handleGetCashbookErr);
  }, [fetchApi]);

  const handleEdit = () => {
    const editClick = () => {};
    return editClick;
  };

  const handleGetFilteredCashbook = (startDate, endDate) => {
    const handleSuccuess = res => {
      handleGetCashbookSuccues(fetchApi, res, setCashbookList);
    };
    const handleError = () => {};
    getFilteredCashbooks(
      getLocalDate(getJSONDate(startDate)),
      getLocalDate(getJSONDate(endDate))
    )
      .then(handleSuccuess)
      .catch(handleError);
  };

  const handleDateChangeFrom = startDate => {
    setSelectedDateFrom(startDate);
    handleGetFilteredCashbook(startDate, selectedDateTo);
  };

  const handleDateChangeTo = endDate => {
    setSelectedDateTo(endDate);
    handleGetFilteredCashbook(selectedDateFrom, endDate);
  };

  const dateComponent = (
    <div className={classes.cashbookUi}>
      <Grid item spacing={5}>
        <p className={classes.cashbookDateAlign}>From :</p>
        <DatePicker
          entry={{
            id: 'id',
            name: 'dateChangeTo',
            label: 'To:',
            value: selectedDateFrom,
          }}
          handleDatePickerChange={handleDateChangeFrom}
          selectedDate={selectedDateFrom}
        />
        <p className={classes.cashbookDateAlign}>To :</p>
        <DatePicker
          entry={{
            id: 'id',
            name: 'dateChangeTo',
            label: 'To:',
            value: selectedDateTo,
          }}
          handleDatePickerChange={handleDateChangeTo}
          selectedDate={selectedDateTo}
        />
      </Grid>
    </div>
  );

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Cashbooks" createNewPath="cashbooks" />
      {dateComponent}
      <TableBuilder
        tableData={cashbookList}
        tableHeaders={getCashbookTableHeaders}
        handleEdit={handleEdit}
        hideEditIcon
        densed
      />
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(Cashbooks);
function handleGetCashbookSuccues(fetchApi, res, setCashbookList) {
  fetchApi(false);
  if (Array.isArray(res.data)) {
    const displayCashbookList = res.data.map(
      ({ id, date, refNo, type, amount, description }) => {
        return {
          id,
          date: getLocalDate(date),
          refNo,
          type,
          amount,
          description,
        };
      }
    );
    setCashbookList(displayCashbookList);
  }
}
