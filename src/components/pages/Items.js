import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder';
import { useHistory } from 'react-router-dom';
import { getItemTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import {
  getAllItemDetails,
  deleteItemStat,
  deleteItem,
  getTotalStockValue,
} from '../../http/itemApi';
import useStyles from '../../styles/useStyles.js';
import ItemFilters from '../uis/ItemComponents/ItemFilters/ItemFilters.js';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle.js';
import { getLocalDate } from '../../utilities/helpers/dateHelpers';
import { fetchApi } from '../../store/actions/globalAction';
import {
  selectSearchValue,
  selectSearchType,
  selectIsBranded,
} from '../../store/selectors/itemFilterSelector';
import { toast } from 'react-toastify';
import {
  selectItemList,
  selectFormattedItemList,
} from '../../store/selectors/itemSelector';
import { setItemList, setFormattedList } from '../../store/actions/itemActions';
import ConfirmationPopup from '../uis/ConfirmationPopup';

const Items = () => {
  const { location, push } = useHistory();
  const itemList = useSelector(selectItemList);
  const formattedItemList = useSelector(selectFormattedItemList);

  const dispatch = useDispatch();

  const searchValue = useSelector(selectSearchValue);
  const searchType = useSelector(selectSearchType);
  const isBranded = useSelector(selectIsBranded);
  const [isDeleteRowConfirmation, setIsDeleteRowConfirmation] = useState(false);
  const [deletingRow, setDeletingRow] = useState({});
  const [totalStockValue, setTotalStockValue] = useState();

  const classes = useStyles();

  const handleGetItemResp = useCallback(
    res => {
      dispatch(fetchApi(false));
      const items = [];
      if (Array.isArray(res.data) && res.data.length) {
        dispatch(setItemList(res.data));
        res.data.forEach(({ id, itemCode, itemName, itemStats, supplier }) => {
          if (itemStats.length) {
            itemStats.forEach(
              ({
                id: itemStatId,
                costPrice,
                salesPrice,
                quantity,
                createdAt,
              }) => {
                items.push({
                  itemStatId,
                  date: getLocalDate(createdAt),
                  itemCode,
                  itemName,
                  qty: quantity,
                  companyName: supplier ? supplier.companyName : 'Branded',
                  costPrice: costPrice,
                  sellingPrice: salesPrice,
                });
              }
            );
          } else {
            items.push({
              id,
              date: '-',
              itemCode,
              itemName,
              qty: '-',
              companyName: supplier ? supplier.companyName : '-',
              costPrice: '-',
              sellingPrice: '-',
            });
          }
        });
      } else {
        toast.info(
          `Oh! No ${isBranded ? 'Branded' : ''} items found for the ${
            searchType === 'itemName' ? 'Item Name' : 'Item Code'
          } ${searchValue}`,
          {
            autoClose: 3000,
          }
        );
      }
      dispatch(setFormattedList(items));
    },
    [dispatch, isBranded, searchType, searchValue]
  );

  const handleGetItemErr = useCallback(
    err => {
      console.log(err);
      dispatch(setItemList([]));
      toast.error('Unable to get Items');
      dispatch(fetchApi(false));
    },
    [dispatch]
  );

  const fetchAllItemDetails = () => {
    dispatch(fetchApi(true));
    getAllItemDetails(searchType, searchValue.trim(), isBranded)
      .then(handleGetItemResp)
      .catch(handleGetItemErr);
  };

  useEffect(() => {
    if (itemList.length) {
      // return;
    }
    fetchAllItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBranded, searchType, searchValue]);

  const handleGetTotalStockValueResp = resp => {
    if (resp.data) {
      setTotalStockValue(resp.data.totalStockValue);
    }
  };

  const handleGetTotalStockValueErr = () => {
    toast.error('Unable to retrieve total stock');
  };

  useEffect(() => {
    dispatch(fetchApi(true));
    getTotalStockValue()
      .then(handleGetTotalStockValueResp)
      .catch(handleGetTotalStockValueErr)
      .finally(dispatch(fetchApi(false)));
  }, [dispatch, formattedItemList]);

  const handleEdit = item => {
    const editClick = () => {
      console.log(item);
      const selectedItem = itemList.filter(i =>
        i.itemStats.find(itemStat => itemStat.id === item.itemStatId)
      );
      if (selectedItem.length) {
        push({
          pathname: `${location.pathname}/edit/${selectedItem[0].id}`,
          state: { editingItem: selectedItem[0] },
        });
      }
    };
    return editClick;
  };

  const handleDeleteRow = async () => {
    if (deletingRow.itemStatId) {
      try {
        dispatch(fetchApi(true));
        await deleteItemStat(deletingRow.itemStatId);
      } catch (_err) {
        toast.error('Unable to delete this row');
      } finally {
        dispatch(fetchApi(false));
      }
    } else {
      try {
        dispatch(fetchApi(true));
        await deleteItem(deletingRow.id);
      } catch (_err) {
        toast.error('Unable to delete the item');
      } finally {
        dispatch(fetchApi(false));
      }
    }
    handleCloseDeleteRowConfirmation();
    fetchAllItemDetails();
  };

  const handleOpenDeleteRowConfirmation = item => () => {
    setIsDeleteRowConfirmation(true);
    setDeletingRow(item);
  };

  const handleCloseDeleteRowConfirmation = () => {
    setIsDeleteRowConfirmation(false);
    setDeletingRow({});
  };

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Items" createNewPath="items" />
      <ItemFilters />
      {totalStockValue && (
        <center>
          Current stock value Rs.{' '}
          <strong>
            {totalStockValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')}
          </strong>
        </center>
      )}
      <TableBuilder
        tableData={formattedItemList}
        tableHeaders={getItemTableHeaders}
        handleEdit={handleEdit}
        handleDelete={handleOpenDeleteRowConfirmation}
        densed
      />
      {isDeleteRowConfirmation && (
        <ConfirmationPopup
          open={isDeleteRowConfirmation}
          close={handleCloseDeleteRowConfirmation}
          handleAgree={handleDeleteRow}
          id="deletePopup"
          header="Confirm Delete"
          content={`Are you sure want to delete this ${
            deletingRow.itemStatId ? 'row?' : 'item?'
          }`}
        />
      )}
    </div>
  );
};

export default Items;
