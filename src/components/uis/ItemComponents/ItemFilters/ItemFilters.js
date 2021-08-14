import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Box,
  // Checkbox,
  // FormGroup,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {
  selectSearchValue,
  selectSearchType,
  // selectIsBranded,
} from '../../../../store/selectors/itemFilterSelector';
import {
  setSearchValue,
  // setIsBranded,
  setSearchType,
} from '../../../../store/actions/itemFilterActions';

const ItemFilters = () => {
  const dispatch = useDispatch();

  const [searchLabel, setSearchLabel] = useState('item code');

  const searchValue = useSelector(selectSearchValue);
  const searchType = useSelector(selectSearchType);
  // const isBranded = useSelector(selectIsBranded);

  const handleSearchFilterChange = e => {
    dispatch(setSearchType(e.target.value));
    setSearchLabel(e.target.name);
  };

  const handleSearchChange = e => {
    dispatch(setSearchValue(e.target.value));
  };

  // const handleBrandedCheckboxClicked = () => {
  //   dispatch(setIsBranded());
  // };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <RadioGroup
            name="itemSearchFilter"
            defaultValue="itemCode"
            value={searchType}
            onChange={handleSearchFilterChange}
          >
            <FormControlLabel
              value="itemStatId"
              label="Id"
              name="itemStatId"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="itemCode"
              label="Item Code"
              name="item code"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="itemName"
              name="item name"
              label="Item Name"
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
            {/* <FormControlLabel
              value="supplierName"
              name="supplier name"
              control={<Radio color="primary" />}
              label="Supplier Name"
              labelPlacement="end"
            /> */}
          </RadioGroup>
        </Grid>
        <Box m="auto" width={'50%'}>
          <Grid item xs={9}>
            <TextField
              autoFocus
              fullWidth
              label={`Enter an ${searchLabel} to search`}
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
        </Box>
        <Box mt="auto" mb="auto" width={'30%'} mx="auto">
          {/*  <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="branded"
                  checked={isBranded}
                  onChange={handleBrandedCheckboxClicked}
                  color="primary"
                />
              }
              label="Branded"
            /> */}
          {/* <FormControlLabel
              control={
                <Checkbox
                  name="supplier"
                  checked={brandedSupplier === 'supplier'}
                  onChange={handleSearchByDefaultOrBranded}
                  color="primary"
                />
              }
              label="Supplier"
            /> */}
          {/* </FormGroup>*/}
        </Box>
      </Grid>
    </>
  );
};

export default ItemFilters;
