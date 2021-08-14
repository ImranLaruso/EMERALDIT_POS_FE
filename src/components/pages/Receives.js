import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder/TableBuilder';
import { getReceiveTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import { fetchApi } from '../../store/actions/globalAction';
import { getItemTotal } from '../../utilities/helpers/receiveHelpers';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';
import PaymentMethodsInfo from '../uis/SaleComponents/PaymentMethodsInfo';
import PaymentMethodSelection from '../uis/SaleComponents/PaymentMethodSelection/PaymentMethodSelection';
import { createReceive } from '../../http/receiveApi';
import ReceiveTableRows from '../uis/SaleComponents/ReceiveTableRows';
import ReceiveItemSearch from '../uis/SaleComponents/ReceiveItemSearch';
import SupplierSearch from '../uis/ReceiveComponents/SupplierSearch';
import {
  selectReceiveCartItems,
  selectReceivePaymentMethod,
} from '../../store/selectors/receiveSelector';
import {
  setReceivePaymentMethod,
  setReceiveCartItems,
  setReceiveSupplier,
} from '../../store/actions/receiveAction';
import { toast } from 'react-toastify';
import { PAYMENT_METHODS } from '../../utilities/constants';

const Receives = () => {
  const classes = useStyles();
  const payedAmount = 0;
  const RECEIVE_PAY_BUTTON_NAMES = ['Complete Receive', 'Add Receive'];

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payAmount, setPayAmount] = useState(0);
  const [buttonName, setButtonName] = useState(RECEIVE_PAY_BUTTON_NAMES[0]);
  const [dueDate, setDueDate] = useState(null);
  const [addSubmitError, setAddSubmitError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userTypedPayAmount, setUserTypedPayAmount] = useState(
    parseFloat(0).toFixed(2)
  );

  const dispatch = useDispatch();
  const cartItems = useSelector(selectReceiveCartItems);
  const paymentMethod = useSelector(selectReceivePaymentMethod);

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

  const getItemReceives = () => {
    const itemReceives = [];
    cartItems.forEach(item => {
      const { id, quantity, discount, itemStatId, receivePrice } = item;
      itemReceives.push({
        itemId: id,
        salesPrice: parseFloat(0).toFixed(2),
        quantity: parseInt(quantity),
        discount: (receivePrice * parseFloat(discount).toFixed(2)) / 100,
        itemStatId,
        receivePrice: parseFloat(receivePrice).toFixed(2),
      });
    });
    return itemReceives;
  };

  const updateDisplayTotal = () => {
    setPayAmount(getCartTotal());
  };

  const handlePaymentMethod = payMethod => {
    dispatch(setReceivePaymentMethod(payMethod));
  };

  const handleKeyDown = () => {
    const keyDown = e => {
      if (e.key === 'Enter') {
        document.getElementById('receive-item-search').focus();
      }
    };
    return keyDown;
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    if (!isAddPaymentMethodValidationsPassed()) {
      return;
    }
    if (buttonName === RECEIVE_PAY_BUTTON_NAMES[1]) {
      const index = PAYMENT_METHODS.indexOf(paymentMethod);
      addPaymentMethod();
      dispatch(
        setReceivePaymentMethod(
          index + 1 === PAYMENT_METHODS.length
            ? PAYMENT_METHODS[0]
            : PAYMENT_METHODS[index + 1]
        )
      );
      addPaymentMethod();
    }
    if (buttonName === RECEIVE_PAY_BUTTON_NAMES[0]) {
      addPaymentMethod();
      handleCreateReceive();
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

  const handleCreateReceiveSuccuess = () => {
    dispatch(fetchApi(false));
    dispatch(setReceiveCartItems([]));
    dispatch(setReceiveSupplier());
    setPaymentMethods([]);
    setDueDate(null);
    setAddSubmitError('');
    setUserTypedPayAmount('');
    setSuggestions([]);
    setPayAmount(parseFloat(0).toFixed(2));
    toast.success('Bill created succuess');
  };

  const handleCreateReceiveError = () => {
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

  const handleCreateReceive = () => {
    const newReceive = {
      supplierId: 1,
      total: getCartTotal(),
      totalDiscount: 0,
      paymentType: getPaymentTypeObject(),
      balance: 0,
      payedAmount,
      itemReceives: getItemReceives(),
      dueDate,
    };

    dispatch(fetchApi(true));
    createReceive(newReceive)
      .then(handleCreateReceiveSuccuess)
      .catch(handleCreateReceiveError);
  };

  const handlePayButtonName = () => {
    if (
      parseFloat(getTotalReceivedAmount()) + parseFloat(payAmount) >=
      parseFloat(getCartTotal())
    ) {
      setButtonName(RECEIVE_PAY_BUTTON_NAMES[0]);
    } else {
      setButtonName(RECEIVE_PAY_BUTTON_NAMES[1]);
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
      <ReceiveTableRows
        handleKeyDown={handleKeyDown}
        getItemTotal={getItemTotal}
        row={row}
        rowIndex={rowIndex}
        key={`receive-table-rows-${rowIndex}-${row.id}`}
      />
    ));

  return (
    <div className={classes.salesContainer}>
      <Container className={classes.salesItemTable}>
        <ReceiveItemSearch
          updateDisplayTotal={updateDisplayTotal}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <TableBuilder
          tableData={[]}
          tableHeaders={getReceiveTableHeaders}
          hidePagination
          tableRows={getTableRows().reverse()}
        />
      </Container>

      <div className={classes.salesRightMenu}>
        <SupplierSearch />
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

export default Receives;
