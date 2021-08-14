import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getEmployeeTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getEmployeeList } from '../../http/employeeApi';
import { fetchApi } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle.js';
import { toast } from 'react-toastify';

const Employees = ({ fetchApi }) => {
  const { location, push } = useHistory();
  const [employeeList, setEmployeeList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const handleGetEmployeeResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayEmployeeList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setEmployeeList(displayEmployeeList);
      }
    };
    const handleGetEmployeeErr = err => {
      toast.error('Unable to get employees');
    };

    fetchApi(true);
    getEmployeeList().then(handleGetEmployeeResp).catch(handleGetEmployeeErr);
  }, [fetchApi]);

  const handleEdit = employee => {
    const editClick = () => {
      push(`${location.pathname}/edit/${employee.id}`);
    };
    return editClick;
  };

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Employees" createNewPath="employees" />
      <TableBuilder
        tableData={employeeList}
        tableHeaders={getEmployeeTableHeaders}
        handleEdit={handleEdit}
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

export default connect(mapStateToProps, mapActionToProps)(Employees);
