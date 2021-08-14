import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder/TableBuilder';
import { getSaleTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import { fetchApi } from '../../store/actions/globalAction';
import { getItemTotal } from '../../utilities/helpers/saleHelpers';
import CustomerSearch from '../uis/SaleComponents/CustomerSearch';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';
import PaymentMethodsInfo from '../uis/SaleComponents/PaymentMethodsInfo';
import PaymentMethodSelection from '../uis/SaleComponents/PaymentMethodSelection/PaymentMethodSelection';
import { createSale } from '../../http/saleApi';
import SaleItemSearch from '../uis/SaleComponents/SaleItemSearch';
import SaleTableRows from '../uis/SaleComponents/SaleTableRows/SaleTableRows';
import {
  selectSaleCartItems,
  selectSaleCustomer,
  selectSalePaymentMethod,
} from '../../store/selectors/saleSelector';
import {
  setSaleCartItems,
  setSaleCustomer,
  setSalePaymentMethod,
} from '../../store/actions/saleActions';
import { toast } from 'react-toastify';
import { PAYMENT_METHODS } from '../../utilities/constants';

const Sales = () => {
  const classes = useStyles();
  const revdAmount = 0;
  const SALE_PAY_BUTTON_NAMES = ['Complete Sale', 'Add Payment'];

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payAmount, setPayAmount] = useState(0);
  const [buttonName, setButtonName] = useState(SALE_PAY_BUTTON_NAMES[0]);
  const [dueDate, setDueDate] = useState(null);
  const [addSubmitError, setAddSubmitError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userTypedPayAmount, setUserTypedPayAmount] = useState(
    parseFloat(0).toFixed(2)
  );

  const dispatch = useDispatch();
  const cartItems = useSelector(selectSaleCartItems);
  const customer = useSelector(selectSaleCustomer);
  const paymentMethod = useSelector(selectSalePaymentMethod);

  const handleCartTotal = () => {
    let cartTotal = 0;
    cartItems.forEach(row => {
      cartTotal = cartTotal + parseFloat(getItemTotal(row));
    });
    return parseFloat(cartTotal).toFixed(2);
  };

  const handleTotalReceivedAmount = () => {
    let totalReceivedAmount = 0;
    paymentMethods.forEach(method => {
      totalReceivedAmount = totalReceivedAmount + parseFloat(method.amount);
    });
    return parseFloat(totalReceivedAmount).toFixed(2);
  };

  const getItemSales = () => {
    const itemSales = [];
    cartItems.forEach(item => {
      const {
        id,
        quantity,
        discount,
        itemStatId,
        salesPrice: sellingPrice,
      } = item;
      itemSales.push({
        itemId: id,
        sellingPrice,
        quantity,
        discount,
        itemStatId,
      });
    });
    return itemSales;
  };

  const updateDisplayTotal = () => {
    setPayAmount(getCartTotal());
  };

  const handlePaymentMethod = payMethod => {
    dispatch(setSalePaymentMethod(payMethod));
  };

  const handleKeyDown = cell => {
    const keyDown = e => {
      if (e.key === 'Tab' && cell === 'discount') {
        document.getElementById('sales-payment-amount').focus();
      } else if (e.key === 'Enter') {
        document.getElementById('sales-item-search').focus();
      }
    };
    return keyDown;
  };

  const handleSearchCustomerSubmit = (_e, value) => {
    dispatch(setSaleCustomer(value));
    setAddSubmitError('');
  };

  const handleRemoveSelectedCustomer = () => {
    dispatch(setSaleCustomer());
  };

  const handleAddSubmit = e => {
    e.preventDefault();

    if (!isAddPaymentMethodValidationsPassed()) {
      return;
    }

    if (buttonName === SALE_PAY_BUTTON_NAMES[1]) {
      const index = PAYMENT_METHODS.indexOf(paymentMethod);
      addPaymentMethod();
      dispatch(
        setSalePaymentMethod(
          index + 1 === PAYMENT_METHODS.length
            ? PAYMENT_METHODS[0]
            : PAYMENT_METHODS[index + 1]
        )
      );
    }

    if (buttonName === SALE_PAY_BUTTON_NAMES[0]) {
      addPaymentMethod();
      handleCreateSale();
    }
  };

  const handleSetPayAmount = () => {
    if ((getCartTotal() - getTotalReceivedAmount()).toFixed(2) > 0) {
      setPayAmount(
        parseFloat(getCartTotal() - getTotalReceivedAmount()).toFixed(2)
      );
    } else {
      setPayAmount(parseFloat(0).toFixed(2));
    }
  };

  const handlePayAmount = e => {
    if (e.target.value >= 0) {
      setPayAmount(e.target.value);
      setUserTypedPayAmount(e.target.value);
    }
  };

  const handleDueDateChange = date => {
    setDueDate(date);
    setAddSubmitError('');
  };

  const isAddPaymentMethodValidationsPassed = () => {
    if (paymentMethod === 'due') {
      if (!customer) {
        toast.error('Please select a customer');
        return false;
      }
      if (!dueDate) {
        toast.error('Please add a due date');
        return false;
      }
      return true;
    }
    return true;
  };

  const addPaymentMethod = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        type: paymentMethod,
        amount: parseFloat(payAmount).toFixed(2),
      },
    ]);
  };

  const handleCreateSaleSuccuess = () => {
    dispatch(fetchApi(false));
    dispatch(setSaleCartItems([]));
    dispatch(setSaleCustomer());
    setPaymentMethods([]);
    setDueDate(null);
    setAddSubmitError('');
    setUserTypedPayAmount('');
    setSuggestions([]);
    setPayAmount(parseFloat(0).toFixed(2));
    toast.success('Bill created succuess');
  };

  const handleCreateSaleError = () => {
    dispatch(fetchApi(false));
    toast.error('Error occured in bill creation');
  };

  const getPaymentTypeObject = () => {
    const paymentType = {};
    paymentMethods.forEach(({ amount, type }) => {
      paymentType[`${type}`] = amount;
    });
    paymentType[`${paymentMethod}`] = parseFloat(payAmount).toFixed(2);
    return paymentType;
  };

  const handleCreateSale = () => {
    const newSale = {
      customerId: customer ? customer.id : 1,
      total: getCartTotal(),
      totalDiscount: 0,
      paymentType: getPaymentTypeObject(),
      balance: 0,
      revdAmount,
      itemSales: getItemSales(),
      dueDate,
    };
    dispatch(fetchApi(true));
    createSale(newSale)
      .then(handleCreateSaleSuccuess)
      .catch(handleCreateSaleError);
  };

  const handlePayButtonName = () => {
    if (
      parseFloat(getTotalReceivedAmount()) + parseFloat(payAmount) >=
      parseFloat(getCartTotal())
    ) {
      setButtonName(SALE_PAY_BUTTON_NAMES[0]);
    } else {
      setButtonName(SALE_PAY_BUTTON_NAMES[1]);
    }
  };

  const getCartTotal = useCallback(handleCartTotal, [cartItems]);

  const getTotalReceivedAmount = useCallback(handleTotalReceivedAmount, [
    paymentMethods,
  ]);

  useEffect(handleSetPayAmount, [getCartTotal, getTotalReceivedAmount]);

  useEffect(handlePayButtonName, [
    getCartTotal,
    getTotalReceivedAmount,
    payAmount,
  ]);

  const getTableRows = () =>
    cartItems.map((row, rowIndex) => (
      <SaleTableRows
        updateDisplayTotal={updateDisplayTotal}
        handleKeyDown={handleKeyDown}
        getItemTotal={getItemTotal}
        row={row}
        rowIndex={rowIndex}
        key={`sale-table-rows-${rowIndex}-${row.id}`}
      />
    ));

  return (
    <div className={classes.salesContainer}>
      <Container className={classes.salesItemTable}>
        <SaleItemSearch
          updateDisplayTotal={updateDisplayTotal}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <TableBuilder
          tableData={[]}
          tableHeaders={getSaleTableHeaders}
          hidePagination
          tableRows={getTableRows().reverse()}
        />
      </Container>

      <div className={classes.salesRightMenu}>
        <CustomerSearch
          handleSearchCustomerSubmit={handleSearchCustomerSubmit}
          handleRemoveSelectedCustomer={handleRemoveSelectedCustomer}
          customer={customer}
        />
        <PaymentMethodsInfo
          paymentMethods={paymentMethods}
          totalPayAmount={getTotalReceivedAmount()}
          handleDueDateChange={handleDueDateChange}
          dueDate={dueDate}
        />
        <TotalDueCard
          total={getCartTotal()}
          totalPayAmount={getTotalReceivedAmount()}
          userTypedPayAmount={userTypedPayAmount}
        />
        <PaymentMethodSelection
          handlePaymentMethod={handlePaymentMethod}
          paymentMethod={paymentMethod}
          handleAddSubmit={handleAddSubmit}
          handlePayAmount={handlePayAmount}
          payAmount={payAmount}
          buttonDisabled={!(payAmount > 0 && getCartTotal() > 0)}
          buttonName={buttonName}
          dueDate={dueDate}
          handleDueDateChange={handleDueDateChange}
          addSubmitError={addSubmitError}
        />
      </div>
    </div>
  );
};

export default Sales;
