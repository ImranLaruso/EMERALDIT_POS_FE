import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { itemSearchForReceives } from '../../../http/itemApi';
import { selectReceiveCartItems } from '../../../store/selectors/receiveSelector';
import { setReceiveCartItems } from '../../../store/actions/receiveAction';
import { toast } from 'react-toastify';
import { getLatestItemReceiveByItemId } from '../../../http/receiveApi';

const ReceiveItemSearch = ({
  updateDisplayTotal,
  suggestions,
  setSuggestions,
}) => {
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState('');
  const [fetchItems, setFetchItems] = useState(false);
  const handleSearchChange = e => setSearchWord(e.target.value);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectReceiveCartItems);

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
      itemSearchForReceives(searchWord)
        .then(handleItemSearchSuccuess)
        .catch(handleItemSearchErr);
    }
  };

  const handleItemSearchSubmit = async (_e, value) => {
    setSearchWord('');
    if (value) {
      const { id, itemName, itemCode } = value;
      const response = await getLatestItemReceiveByItemId(id);
      let previousReceivePrice, previousQty, previousDiscount;

      if (response && Array.isArray(response.data) && response.data.length) {
        const { receivePrice, quantity, discount } = response.data[0];
        previousReceivePrice = receivePrice;
        previousQty = quantity;
        previousDiscount = discount ? (100 * discount) / receivePrice : 0;
      }

      cartItems.push({
        id,
        itemCode,
        itemName,
        quantity: previousQty || 1,
        receivePrice: previousReceivePrice || 0,
        salesPrice: '',
        discount: previousDiscount || 0,
        total: parseFloat(0).toFixed(2),
      });

      dispatch(setReceiveCartItems([...cartItems]));
      updateDisplayTotal();
    }
  };

  useEffect(handleItemSearch, [searchWord]);

  return (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id="receive-item-search"
          getOptionLabel={option =>
            `${option.itemName} [${option.itemCode}/${option.supplier?.companyName}]`
          }
          options={suggestions}
          onChange={handleItemSearchSubmit}
          loading={fetchItems}
          noOptionsText={'No items found'}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter an Item Code, Item Name or Item Id"
              variant="outlined"
              onChange={handleSearchChange}
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

export default ReceiveItemSearch;
