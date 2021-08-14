export const getItemTotal = row => {
  return parseFloat(
    row.quantity * ((row.receivePrice * (100 - row.discount)) / 100)
  ).toFixed(2);
};
