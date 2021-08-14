export const getFormattedSupplierList = data =>
  data.map(({ id, firstName, phoneNo, companyName }) => {
    return {
      id,
      firstName,
      companyName,
      phoneNo: phoneNo || '-',
    };
  });
