import { PAGE_ROUTES } from '../services/routeService';
import {
  Customers,
  FormCustomer,
  Employees,
  FormEmployee,
  Suppliers,
  FormSupplier,
  Items,
  Cashbooks,
  FormCashbook,
  FormSettings,
  Dashboard,
  FormItem,
} from '../components/pages';
import DailySales from '../components/pages/dashboard/DailySales';
import BestSellingEmployee from '../components/pages/dashboard/BestSellingCustomer';
import MostSellingItems from '../components/pages/dashboard/MostSellingItems';
import PaymentTypeAnalytics from '../components/pages/dashboard/PaymentTypeAnalytics';
import LineGraph from '../components/pages/dashboard/LineGraph';
import LowInventory from '../components/pages/dashboard/LowInventory';
import Sales from '../components/pages/Sales';
import Receives from '../components/pages/Receives';
import Brands from '../components/pages/Brands';
import Stock from '../components/pages/Stock';
import FormBrand from '../components/pages/FormBrand/FormBrand';

export const customerRoutes = [
  {
    path: PAGE_ROUTES.customers,
    component: Customers,
  },
  {
    path: PAGE_ROUTES.newCustomer,
    component: FormCustomer,
  },
  {
    path: PAGE_ROUTES.editCustomer,
    component: FormCustomer,
  },
];
export const employeeRoutes = [
  {
    path: PAGE_ROUTES.employees,
    component: Employees,
  },
  {
    path: PAGE_ROUTES.newEmployee,
    component: FormEmployee,
  },
  {
    path: PAGE_ROUTES.editEmployee,
    component: FormEmployee,
  },
];

export const supplierRoutes = [
  {
    path: PAGE_ROUTES.suppliers,
    component: Suppliers,
  },
  {
    path: PAGE_ROUTES.newSupplier,
    component: FormSupplier,
  },
  {
    path: PAGE_ROUTES.editSupplier,
    component: FormSupplier,
  },
];

export const itemRoutes = [
  {
    path: PAGE_ROUTES.items,
    component: Items,
  },
  {
    path: PAGE_ROUTES.newItem,
    component: FormItem,
  },
  {
    path: PAGE_ROUTES.editItem,
    component: FormItem,
  },
];

export const brandRoutes = [
  {
    path: PAGE_ROUTES.brands,
    component: Brands,
  },
  {
    path: PAGE_ROUTES.newBrand,
    component: FormBrand,
  },
  {
    path: PAGE_ROUTES.editBrand,
    component: FormBrand,
  },
];

export const stockRoutes = [
  {
    path: PAGE_ROUTES.stock,
    component: Stock,
  },
];

export const cashbookRoutes = [
  {
    path: PAGE_ROUTES.cashbooks,
    component: Cashbooks,
  },
  {
    path: PAGE_ROUTES.newCashbook,
    component: FormCashbook,
  },
  {
    path: PAGE_ROUTES.payDue,
    component: FormCashbook,
  },
  {
    path: PAGE_ROUTES.editCashbook,
    component: FormCashbook,
  },
];

export const saleNewRoutes = [
  {
    path: PAGE_ROUTES.sales,
    component: Sales,
  },
];

export const receiveNewRoutes = [
  {
    path: PAGE_ROUTES.receives,
    component: Receives,
  },
];

export const settingsRoutes = [
  {
    path: PAGE_ROUTES.settings,
    component: FormSettings,
  },
];

export const dashboardRoutes = [
  {
    path: PAGE_ROUTES.home,
    component: Dashboard,
  },
  {
    path: PAGE_ROUTES.dailySales,
    component: DailySales,
  },
  {
    path: PAGE_ROUTES.bestSellingCustomer,
    component: BestSellingEmployee,
  },
  {
    path: PAGE_ROUTES.mostSelledItems,
    component: MostSellingItems,
  },
  {
    path: PAGE_ROUTES.paymentTypeAnalytics,
    component: PaymentTypeAnalytics,
  },
  {
    path: PAGE_ROUTES.lineGraph,
    component: LineGraph,
  },
  {
    path: PAGE_ROUTES.lowInventory,
    component: LowInventory,
  },
];
