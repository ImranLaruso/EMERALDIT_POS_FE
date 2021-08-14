import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaleToolTip from './SaleToolTip';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { itemSearch } from '../../../http/itemApi';
import { setSaleCartItems } from '../../../store/actions/saleActions';
import { selectSaleCartItems } from '../../../store/selectors/saleSelector';
import { toast } from 'react-toastify';

const SaleItemSearch = ({
  updateDisplayTotal,
  suggestions,
  setSuggestions,
}) => {
  const classes = useStyles();
  const [highlightedOption, setHighlightedOption] = useState();
  const [searchWord, setSearchWord] = useState('');
  const [fetchItems, setFetchItems] = useState(false);
  const handleSearchChange = e => setSearchWord(e.target.value);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectSaleCartItems);

  const handleItemSearch = () => {
    const handleItemSearchSuccuess = resp => {
      setFetchItems(false);
      if (Array.isArray(resp.data)) {
        setSuggestions(resp.data);
      }
    };
    const handleItemSearchErr = err => {
      setFetchItems(false);
      toast.error('Unable to search items');
      console.log(err);
    };
    if (searchWord) {
      setFetchItems(true);
      itemSearch(searchWord)
        .then(handleItemSearchSuccuess)
        .catch(handleItemSearchErr);
    }
  };

  const handleItemSearchSubmit = (_e, value) => {
    setSearchWord('');
    setHighlightedOption();
    if (value) {
      const {
        item: { id, itemName, itemCode },
        costPrice,
        itemStatId,
        quantity: stockQty,
      } = value;
      cartItems.push({
        id,
        itemCode,
        itemName,
        quantity: 1,
        salesPrice: parseFloat(costPrice).toFixed(2),
        discount: parseFloat(0).toFixed(2),
        total: parseFloat(costPrice).toFixed(2),
        itemStatId,
        stockQty,
      });
      dispatch(setSaleCartItems([...cartItems]));
      updateDisplayTotal();
    }
  };

  useEffect(handleItemSearch, [searchWord]);

  return (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id="sales-item-search"
          renderOption={option => {
            if (option.detail) {
              return <SaleToolTip option={option} />;
            }
            return (
              <div>{`${option.item.id}-${option.item.itemName} [${
                option.item.category || ''
              }/${option.item.supplier?.companyName}]`}</div>
            );
          }}
          getOptionLabel={option =>
            `${option.item.id}-${option.item.itemName}-${option.item.itemCode}-${option.itemStatId}`
          }
          options={
            highlightedOption
              ? [...suggestions, { ...highlightedOption, detail: true }]
              : suggestions
          }
          onChange={handleItemSearchSubmit}
          onHighlightChange={(_event, selectedOpt) => {
            setHighlightedOption(selectedOpt);
          }}
          getOptionDisabled={opt => opt.detail}
          disabledItemsFocusable
          loading={fetchItems}
          noOptionsText={'No items found'}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter an Item Code, Item Name or Item Id"
              onChange={handleSearchChange}
              inputProps={{
                ...params.inputProps,
                value: searchWord,
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <React.Fragment>
                    {fetchItems && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SaleItemSearch;
