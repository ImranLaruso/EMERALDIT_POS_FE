export const getFormattedStockList = data =>
  data.map(({ itemCode, itemName, companyName, qty, reOrderLevel }) => {
    return {
      itemCode,
      itemName,
      companyName: companyName || '-',
      totalQty: qty?.totalQty || 0,
      lowStock: Number(reOrderLevel || 5) >= qty?.totalQty,
    };
  });
