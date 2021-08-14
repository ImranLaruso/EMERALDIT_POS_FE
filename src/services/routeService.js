import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';

export const PAGE_ROUTES = {
  // home: '/dashboard',
  login: '/login',
  customers: '/customers',
  cashbooks: '/cashbooks',
  newCustomer: '/customers/new',
  settings: '/settings',
  newCashbook: '/cashbooks/new',
  editCustomer: '/customers/edit/:id',
  editSettings: '/settings/edit/:id',
  editCashbook: '/cashbooks/edit/:id',
  employees: '/employees',
  newEmployee: '/employees/new',
  editEmployee: '/employees/edit/:id',
  suppliers: '/suppliers',
  newSupplier: '/suppliers/new',
  editSupplier: '/suppliers/edit/:id',
  sales: '/sales',
  receives: '/receives',
  items: '/items',
  newItem: '/items/new',
  editItem: '/items/edit/:id',
  brands: '/brands',
  newBrand: '/brands/new',
  editBrand: '/brands/edit/:id',
  stock: '/stock',
  payDue: '/cashbooks/payCustomerDue/:customerId',
  // dailySales: '/dashboard/dailySales',
  // bestSellingCustomer: '/dashboard/bestSellingCustomer',
  // mostSelledItems: '/dashboard/mostSelledItems',
  // paymentTypeAnalytics: '/dashboard/paymentTypeAnalytics',
  // lineGraph: '/dashboard/lineGraph',
  // lowInventory: '/dashboard/lowInventory',
};

const SIDE_MENU_HIDE_ROUTES = {
  [PAGE_ROUTES.login]: true,
};

export const SIDE_MENU_ITEMS = [
  {
    key: 'home',
    path: PAGE_ROUTES.home,
    title: 'Dashboard',
    icon: DashboardIcon,
    disabled: true,
  },
  {
    key: 'customers',
    path: PAGE_ROUTES.customers,
    title: 'Customers',
    icon: PeopleIcon,
  },
  {
    key: 'employees',
    path: PAGE_ROUTES.employees,
    title: 'Employees',
    icon: PeopleIcon,
  },
  {
    key: 'suppliers',
    path: PAGE_ROUTES.suppliers,
    title: 'Suppliers',
    icon: PeopleIcon,
  },
  {
    key: 'sales',
    path: PAGE_ROUTES.sales,
    title: 'Sales',
    icon: AttachMoneyIcon,
  },
  {
    key: 'receives',
    path: PAGE_ROUTES.receives,
    title: 'Receives',
    icon: AttachMoneyIcon,
  },
  {
    key: 'items',
    path: PAGE_ROUTES.items,
    title: 'Items',
    icon: StorageIcon,
  },
  {
    key: 'stock',
    path: PAGE_ROUTES.stock,
    title: 'Stock',
    icon: StorageIcon,
  },
  {
    key: 'brands',
    path: PAGE_ROUTES.brands,
    title: 'Brands',
    icon: StorageIcon,
  },
  {
    key: 'cashbooks',
    path: PAGE_ROUTES.cashbooks,
    title: 'Cashbooks',
    icon: AttachMoneyIcon,
  },
  {
    key: 'settings',
    path: PAGE_ROUTES.settings,
    title: 'Settings',
    icon: AttachMoneyIcon,
    disabled: true,
  },
];

export const showSideMeuForRoute = route => {
  return !SIDE_MENU_HIDE_ROUTES[route];
};
