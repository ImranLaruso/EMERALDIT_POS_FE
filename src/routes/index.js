import React from 'react';
import { Switch } from 'react-router-dom';
import { Login } from '../components/pages';
import ProtectedRoute from './ProtectedRoute';
import { PAGE_ROUTES } from '../services/routeService';
import {
  customerRoutes,
  employeeRoutes,
  supplierRoutes,
  itemRoutes,
  cashbookRoutes,
  saleNewRoutes,
  receiveNewRoutes,
  brandRoutes,
  stockRoutes,
} from './routeHelper';
import { LinearProgress } from '@material-ui/core';

const Routes = () => (
  <Switch>
    <React.Suspense fallback={<LinearProgress color="secondary" />}>
      {/* dashboardRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      )) */}
      <ProtectedRoute
        exact
        path={PAGE_ROUTES.login}
        component={Login}
        authRequired={false}
      />
      {customerRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
          isAuthenticated={null}
        />
      ))}
      {employeeRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {supplierRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {itemRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {brandRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {stockRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {cashbookRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {saleNewRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {receiveNewRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
      {/* settingsRoutes.map(route => (
        <ProtectedRoute
          exact
          path={route.path}
          component={route.component}
          key={route.path}
        />
      )) */}
      {/* <ProtectedRoute component={NotFoundPage} /> */}
    </React.Suspense>
  </Switch>
);

export default Routes;
