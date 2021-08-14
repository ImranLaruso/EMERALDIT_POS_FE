import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TextField, Box, Grid, Button, Container } from '@material-ui/core';
import {
  SubmitButton,
  StyledFieldContainer,
  StyledBackArrow,
  BackButtonContainer,
  Title,
} from './FormBrand.styles';
import { fetchApi } from '../../../store/actions/globalAction';
import { PAGE_ROUTES } from '../../../services/routeService';
import { toast } from 'react-toastify';
import ConfirmationPopup from '../../uis/ConfirmationPopup';
import {
  createBrand,
  updateBrandById,
  deleteBrand,
} from '../../../http/brandApi';

const FormBrand = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const { push, goBack } = useHistory();
  const { state } = useLocation();
  const { id } = useParams();
  const editingBrand = state ? state.editingBrand : '';
  const [openConfirm, setOpenConfirmation] = useState(false);

  const onSubmit = async data => {
    dispatch(fetchApi(true));

    if (editingBrand) {
      try {
        await updateBrandById(id, data);
        push(PAGE_ROUTES.brands);
        toast.success('Succuessfully Updated');
      } catch (err) {
        toast.error('unable to update brand details');
      } finally {
        dispatch(fetchApi(false));
      }
    } else {
      try {
        await createBrand(data);
        push(PAGE_ROUTES.brands);
        toast.success('Succuessfully created');
      } catch (err) {
        toast.error('unable to create brand');
      } finally {
        dispatch(fetchApi(false));
      }
    }
  };

  const handleBack = () => {
    goBack();
  };

  const handleDelete = async () => {
    try {
      dispatch(fetchApi(true));
      await deleteBrand(id);
      push(PAGE_ROUTES.brands);
    } catch (_err) {
      toast.error('Unable to delete brand');
    } finally {
      dispatch(fetchApi(false));
    }
  };

  const handleOpenDeleteConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <Container style={{ width: '80%' }}>
      <BackButtonContainer>
        <Button variant="contained" color="default" onClick={handleBack}>
          <StyledBackArrow /> Go Back
        </Button>
      </BackButtonContainer>
      <Title component="h1" variant="h5">
        <Box lineHeight={2}>Create New Brand</Box>
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldContainer>
          <TextField
            name="code"
            inputRef={register}
            label="Brand Code"
            fullWidth
            variant="outlined"
            defaultValue={editingBrand ? editingBrand.code : ''}
          />
        </StyledFieldContainer>

        <StyledFieldContainer>
          <TextField
            name="name"
            inputRef={register}
            label="Brand Name"
            fullWidth
            variant="outlined"
            defaultValue={editingBrand ? editingBrand.name : ''}
          />
        </StyledFieldContainer>

        <Grid container>
          <Grid item xs={5}>
            <SubmitButton
              variant="contained"
              color="secondary"
              onClick={editingBrand ? handleOpenDeleteConfirmation : handleBack}
              fullWidth
            >
              {editingBrand ? 'Delete' : 'Cancel'}
            </SubmitButton>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={5}>
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {editingBrand ? 'Edit Brand' : 'Add Brand'}
            </SubmitButton>
          </Grid>
        </Grid>
      </form>

      {openConfirm && (
        <ConfirmationPopup
          open={openConfirm}
          close={handleCloseDeleteConfirmation}
          handleAgree={handleDelete}
          id="deletePopup"
          header="Confirm Delete"
          content={`Are you sure want to delete this brand?`}
        />
      )}
    </Container>
  );
};

export default FormBrand;
