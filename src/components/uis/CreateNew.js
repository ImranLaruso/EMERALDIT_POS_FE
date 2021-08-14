import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { PAGE_ROUTES } from '../../services/routeService';
import useStyles from '../../styles/useStyles';

const CreateNew = ({ type }) => {
  const { push } = useHistory();
  const classes = useStyles();

  const handleCreateNew = () => {
    push(`${PAGE_ROUTES[type]}/new`);
  };

  return (
    <div className={classes.createNewButton}>
      <Button color='primary' variant='contained' onClick={handleCreateNew}>
        Create New{' '}
      </Button>
    </div>
  );
};

export default CreateNew;
