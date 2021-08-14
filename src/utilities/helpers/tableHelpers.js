const getEmptyColumnForEditOrDelete = id => ({
  id,
  numeric: false,
  label: '',
  padding: 'checkbox',
});

export const getSettingsTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Settings Id',
  },
  {
    id: 'logo',
    numeric: false,
    disablePadding: false,
    label: 'Company Logo',
  },
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'phoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'openingTime',
    numeric: false,
    disablePadding: false,
    label: 'Opening Time',
  },
  {
    id: 'closingTime',
    numeric: false,
    disablePadding: false,
    label: 'Closing Time',
  },
  getEmptyColumnForEditOrDelete('edit'),
  getEmptyColumnForEditOrDelete('delete'),
];

export const getCustomerTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Customer Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },

  getEmptyColumnForEditOrDelete('edit'),
];

export const getDueCustomerTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Customer Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'payHere',
    numeric: false,
    disablePadding: false,
    label: 'Pay Due',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getEmployeeTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Employee Id',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  {
    id: 'phoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'bankAccount',
    numeric: false,
    disablePadding: false,
    label: 'Acc no',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getSupplierTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Supplier Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'phoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getBrandTableHeaders = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Brand Id',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Brand Code',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Brand Name',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getStockTableHeaders = [
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Item Code',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: 'Comapny Name',
  },
  {
    id: 'totalQty',
    numeric: false,
    disablePadding: false,
    label: 'Total Qty',
  },
];

export const getSaleTableHeaders = [
  {
    id: 'itemCode',
    numeric: false,
    disablePadding: false,
    label: 'Item Code',
  },
  {
    id: 'itemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Discount per item',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Total',
  },
  getEmptyColumnForEditOrDelete('delete'),
];

export const getReceiveTableHeaders = [
  {
    id: 'itemCode',
    numeric: false,
    disablePadding: false,
    label: 'Item Code',
  },
  {
    id: 'ItemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
  {
    id: 'costPrice',
    numeric: false,
    disablePadding: false,
    label: 'Cost Price',
  },
  {
    id: 'discount',
    numeric: false,
    disablePadding: false,
    label: 'Discount(%)',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Total',
  },
  getEmptyColumnForEditOrDelete('delete'),
];

export const getItemTableHeaders = [
  {
    id: 'itemStatId',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  { id: 'itemCode', numeric: false, disablePadding: false, label: 'Item Code' },
  {
    id: 'itemName',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  {
    id: 'qty',
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'costPrice',
    numeric: false,
    disablePadding: false,
    label: 'Cost Price',
  },
  getEmptyColumnForEditOrDelete('edit'),
];

export const getCashbookTableHeaders = [
  {
    id: 'cashbookId',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'refNo',
    numeric: false,
    disablePadding: false,
    label: 'Ref. No.',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'type',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  getEmptyColumnForEditOrDelete('edit'),
];
