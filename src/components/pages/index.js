import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import NotFoundPage from './NotFoundPage';

const Customers = React.lazy(() => import('./Customers'));
const Employees = React.lazy(() => import('./Employees'));
const Suppliers = React.lazy(() => import('./Suppliers'));
const Items = React.lazy(() => import('./Items'));
const Cashbooks = React.lazy(() => import('./Cashbooks'));
const FormCustomer = React.lazy(() => import('./FormCustomer'));
const FormEmployee = React.lazy(() => import('./FormEmployee'));
const FormSupplier = React.lazy(() => import('./FormSupplier'));
const FormSettings = React.lazy(() => import('./FormSettings'));
const FormCashbook = React.lazy(() => import('./FormCashbook'));
const FormItem = React.lazy(() => import('./FormItem/FormItem'));

export {
  Dashboard,
  Login,
  Customers,
  Employees,
  Suppliers,
  Items,
  Cashbooks,
  NotFoundPage,
  FormCustomer,
  FormEmployee,
  FormSupplier,
  FormItem,
  FormCashbook,
  FormSettings,
};
