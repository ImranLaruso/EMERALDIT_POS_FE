import React /* Fragment,  useState*/ from 'react';
import { connect } from 'react-redux';
import useStyles from '../../../styles/useStyles';
// import SearchIcon from '@material-ui/icons/Search';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { /* TextField, CircularProgress, */ Card } from '@material-ui/core';
import { fetchApi } from '../../../store/actions/globalAction';
// import { searchSupplier } from '../../../http/supplierApi';

const SupplierSearch = () =>
  // {
  // setFetchApiInfo,
  // handleRemoveSelectedSupplier,
  // handleSearchSupplierSubmit,
  // supplier,
  // }
  {
    const classes = useStyles();

    // const [suggestions, setSuggestions] = useState([]);
    // const [fetchSuppliers, setFetchSuppliers] = useState(false);

    // const handleSearchChange = e => {
    //   const searchSuccess = res => {
    //     setFetchSuppliers(false);
    //     console.log(res.data);
    //     if (Array.isArray(res.data)) {
    //       setSuggestions(res.data);
    //     }
    //   };

    //   const searchErr = () => {
    //     setFetchApiInfo({ type: 'error', message: 'Unable to search suppliers' });
    //     setFetchSuppliers(false);
    //   };
    //   setFetchSuppliers(true);
    //   searchSupplier(e.target.value)
    //     .then(searchSuccess)
    //     .catch(searchErr);
    // };

    // if (supplier.id > 1) {
    // const { firstName, lastName, email } = supplier;
    return (
      <Card className={classes.cardSales}>
        <div className={classes.salesCustomerInfo}>
          <div className={classes.displaySalesCustomerInfo}>
            {/* <h2>{`${firstName} ${lastName}`}</h2> */}
            <h3>
              <center>{`${'You should create an item if item does not show in suggestions'} ${''}`}</center>
            </h3>
            {/* <h3>{email}</h3> */}
          </div>
          {/* <div className={classes.removeCustomerIcon}>
          <RemoveCircleIcon
            onClick={handleRemoveSelectedSupplier}
            className={classes.materialIcon}
          />
        </div> */}
        </div>
      </Card>
    );
    // }
    // return (
    //   <Card className={classes.cardSales}>
    //     <div className={classes.inputsTop}>
    //       <div className={classes.searchTab}>
    //         <Autocomplete
    //           id="supplier-search"
    //           getOptionLabel={option => `${option.firstName} ${option.lastName}`}
    //           options={suggestions}
    //           onChange={handleSearchSupplierSubmit}
    //           loading={fetchSuppliers}
    //           noOptionsText={'No suppliers found'}
    //           renderInput={params => (
    //             <TextField
    //               autoFocus
    //               {...params}
    //               label="Enter a Supplier name or Id"
    //               onChange={handleSearchChange}
    //               InputProps={{
    //                 ...params.InputProps,
    //                 startAdornment: <SearchIcon />,
    //                 endAdornment: (
    //                   <Fragment>
    //                     {fetchSuppliers && (
    //                       <CircularProgress color="inherit" size={20} />
    //                     )}
    //                     {params.InputProps.endAdornment}
    //                   </Fragment>
    //                 ),
    //               }}
    //             />
    //           )}
    //         />
    //       </div>
    //     </div>
    //   </Card>
    // );
  };

const mapStateToProps = ({ global, sale }) => ({ ...global, ...sale });

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(SupplierSearch);
