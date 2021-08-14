/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../../styles/useStyles';
import { setFetchApiInfo } from '../../store/actions/globalAction';

const ErrorDisplay = ({ info = {}, handleClose, setFetchApiErr }) => {
  const classes = useStyles();
  const handleCloseFetchApi = (_event, _reason) => {
    setFetchApiErr(null);
  };
  return (
    <div className={classes.errorDisplayRoot}>
      {info.type && (
        <Snackbar
          open={!!info.type}
          onClose={handleClose || handleCloseFetchApi}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={info.type}
            onClose={handleClose || handleCloseFetchApi}
          >
            {info.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

const mapStateToProps = ({ global }) => ({
  ...global,
});

const mapActionToProps = {
  setFetchApiErr: setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(ErrorDisplay);
