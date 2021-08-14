export const getItemTotal = row => {
  return parseFloat(row.quantity * (row.salesPrice - row.discount)).toFixed(2);
};
