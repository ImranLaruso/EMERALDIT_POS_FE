import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableBuilder from '../uis/TableBuilder/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getBrandTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { fetchApi } from '../../store/actions/globalAction.js';
import useStyles from '../../styles/useStyles.js';
import PageTitle from '../uis/UtilComponents/PageTitle/PageTitle.js';
import { toast } from 'react-toastify';
import { getBrandsList } from '../../http/brandApi.js';
import { setBrandList } from '../../store/actions/brandActions.js';
import { selectAllBrandList } from '../../store/selectors/brandSelector.js';
import { getFormattedBrandList } from '../../utilities/helpers/brandHelpers.js';

const Brands = () => {
  const { location, push } = useHistory();
  const classes = useStyles();

  const allBrandList = useSelector(selectAllBrandList);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetBrandResp = res => {
      dispatch(fetchApi(false));
      if (Array.isArray(res.data)) {
        const dispalyBrandList = getFormattedBrandList(res.data);
        dispatch(setBrandList(dispalyBrandList));
      }
    };

    const handleGetBrandErr = _err => {
      toast.error('Unable to get brands');
      dispatch(fetchApi(false));
    };

    dispatch(fetchApi(true));
    getBrandsList()
      .then(handleGetBrandResp)
      .catch(handleGetBrandErr);
  }, [dispatch]);

  const handleEdit = brand => {
    const selectedBrand = allBrandList.filter(i => i.id === brand.id);

    const editClick = () => {
      push({
        pathname: `${location.pathname}/edit/${brand.id}`,
        state: { editingBrand: selectedBrand[0] },
      });
    };

    return editClick;
  };

  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Brands" createNewPath="brands" />
      <TableBuilder
        tableData={allBrandList}
        tableHeaders={getBrandTableHeaders}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Brands;
