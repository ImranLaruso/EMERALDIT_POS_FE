export const getFormattedBrandList = data =>
  data.map(({ id, name, code }) => {
    return {
      id,
      name,
      code,
    };
  });
