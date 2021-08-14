import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationPopup = ({
  open,
  close,
  handleAgree,
  id,
  header,
  content
}) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle id={id}>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirmation-text'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='primary'>
          Nope
        </Button>
        <Button onClick={handleAgree} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
