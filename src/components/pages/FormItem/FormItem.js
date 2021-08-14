import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
} from '@material-ui/core';
import {
  SubmitButton,
  StyledFormControl,
  StyledFieldContainer,
} from './FormItem.styles';
import { CATEGORY_VALUES } from './FormItemConstants';
import { fetchApi } from '../../../store/actions/globalAction';
import { createItem, updateItemById, deleteItem } from '../../../http/itemApi';
import { PAGE_ROUTES } from '../../../services/routeService';
import { toast } from 'react-toastify';
import { setAllSupplierList } from '../../../store/actions/supplierActions';
import { getFormattedSupplierList } from '../../../utilities/helpers/supplierHelpers';
import { getSupplierList } from '../../../http/supplierApi';
import { selectAllSupplierList } from '../../../store/selectors/supplierSelector';
import ConfirmationPopup from '../../uis/ConfirmationPopup';
import { selectAllBrandList } from '../../../store/selectors/brandSelector';
import PageTitle from '../../uis/UtilComponents/PageTitle/PageTitle';

const FromItem = () => {
  const { control, handleSubmit, register, watch } = useForm();
  const dispatch = useDispatch();
  const { push, goBack } = useHistory();
  const { state } = useLocation();
  const { id } = useParams();
  const editingItem = state ? state.editingItem : '';
  const allSupplierList = useSelector(selectAllSupplierList);
  const allBrandList = useSelector(selectAllBrandList);
  const [openConfirm, setOpenConfirmation] = useState(false);

  const getFirstNames = str => {
    const matches = str.match(/\b(\w)/g);
    return matches.join('').toUpperCase();
  };

  useEffect(() => {
    const handleGetSupplierResp = res => {
      dispatch(fetchApi(false));
      if (Array.isArray(res.data)) {
        dispatch(setAllSupplierList(getFormattedSupplierList(res.data)));
      }
    };

    const handleGetSupplierErr = _err => {
      toast.error('Unable to get suppliers');
      dispatch(fetchApi(false));
    };

    if (allSupplierList.length) {
      return;
    }

    dispatch(fetchApi(true));
    getSupplierList().then(handleGetSupplierResp).catch(handleGetSupplierErr);
  }, [allSupplierList.length, dispatch]);

  const values = watch();
  const { category, itemName, brandId, partNumber } = values;
  let itemCode;
  if (brandId === 'Original-OE') {
    itemCode = partNumber || '';
  } else {
    itemCode = editingItem ? editingItem.itemCode : 'G';

    if (category || itemName || brandId) {
      itemCode = 'G';
    }

    itemCode += category ? category.split('-')[1] : '';
    itemCode += itemName ? getFirstNames(itemName) : '';
    itemCode += brandId ? brandId.split('-')[1] : '';
  }

  const onSubmit = async data => {
    dispatch(fetchApi(true));

    if (data.category) {
      data.category = data.category.split('-')[0];
    }

    if (data.brandId === 'Original-OE') {
      data.brandId = null;
    } else {
      data.brandId = parseInt(data.brandId.split('-')[0]);
    }

    if (!data.description) {
      data.description = undefined;
    }

    data.partNumber = undefined;

    data.itemCode = itemCode;

    if (editingItem) {
      try {
        await updateItemById(id, data);
        push(PAGE_ROUTES.items);
        toast.success('Succuessfully Updated');
      } catch (err) {
        toast.error('unable to update item details');
      } finally {
        dispatch(fetchApi(false));
      }
    } else {
      try {
        await createItem(data);
        push(PAGE_ROUTES.items);
        toast.success('Succuessfully created');
      } catch (err) {
        toast.error('unable to create item');
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
      await deleteItem(id);
      push(PAGE_ROUTES.items);
    } catch (_err) {
      toast.error('Unable to delete item');
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

  const getEditingCategoryValue = () => {
    const categoryObj = CATEGORY_VALUES.filter(
      category => category.value === editingItem.category
    );
    return `${categoryObj[0].value}-${categoryObj[0].key}`;
  };

  const getEditingBrandValue = () => {
    const brand = allBrandList.filter(
      brand => brand.id === editingItem.brandId
    );

    if (brand.length) {
      return `${brand[0].id}-${brand[0].code}`;
    }
    return 'Original-OE';
  };

  return (
    <Container style={{ width: '80%' }}>
      <PageTitle
        title={editingItem ? 'Edit Item' : 'Create New Item'}
        backButton
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldContainer>
          <TextField
            name="itemCode"
            label="Item Code"
            fullWidth
            disabled
            variant="outlined"
            value={itemCode}
          />
        </StyledFieldContainer>

        <StyledFieldContainer>
          <TextField
            name="itemName"
            inputRef={register}
            label="Item Name"
            fullWidth
            variant="outlined"
            defaultValue={editingItem ? editingItem.itemName : ''}
          />
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledFormControl>
            <InputLabel htmlFor={'category'}>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              defaultValue={editingItem ? getEditingCategoryValue() : '2S-2S'}
              as={
                <Select id={'category'} name="category">
                  {CATEGORY_VALUES.map(({ key, value }) => (
                    <MenuItem key={key} value={`${value}-${key}`}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </StyledFormControl>
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledFormControl>
            <InputLabel htmlFor={'brandId'}>Brand</InputLabel>
            <Controller
              name="brandId"
              control={control}
              defaultValue={editingItem ? getEditingBrandValue() : ''}
              as={
                <Select id={'brandId'} name="brandId">
                  <MenuItem key={'Original-OE'} value={'Original-OE'}>
                    Original-OE
                  </MenuItem>
                  {allBrandList.map(({ id, code, name }) => (
                    <MenuItem key={id} value={`${id}-${code}`}>
                      {`${code} - ${name}`}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </StyledFormControl>
        </StyledFieldContainer>

        {brandId === 'Original-OE' && (
          <StyledFieldContainer>
            <TextField
              name="partNumber"
              inputRef={register}
              label="Part Number"
              fullWidth
              variant="outlined"
              defaultValue={editingItem ? editingItem.itemCode : ''}
            />
          </StyledFieldContainer>
        )}

        <StyledFieldContainer>
          <StyledFormControl>
            <InputLabel id={'supplierId'}>Select a Supplier</InputLabel>
            <Controller
              name="supplierId"
              control={control}
              defaultValue={editingItem ? editingItem.supplier.id : ''}
              as={
                <Select id={'supplierId'} name={'supplierId'}>
                  {allSupplierList.map(({ id, companyName }) => (
                    <MenuItem key={id} value={id}>
                      {companyName}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </StyledFormControl>
        </StyledFieldContainer>
        <StyledFieldContainer>
          <TextField
            name="reOrderLevel"
            inputRef={register}
            label="Reorder level"
            variant="outlined"
            fullWidth
            defaultValue={editingItem ? editingItem.reOrderLevel : ''}
          />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <TextField
            name="description"
            inputRef={register}
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
          />
        </StyledFieldContainer>
        <Grid container>
          <Grid item xs={5}>
            <SubmitButton
              variant="contained"
              color="secondary"
              onClick={editingItem ? handleOpenDeleteConfirmation : handleBack}
              fullWidth
            >
              {editingItem ? 'Delete' : 'Cancel'}
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
              {editingItem ? 'Edit Item' : 'Add Item'}
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
          content={`Are you sure want to delete this item?`}
        />
      )}
    </Container>
  );
};

export default FromItem;
