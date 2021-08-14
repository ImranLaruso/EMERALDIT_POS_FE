export const getLocalDate = date => {
  return date.slice(0, 10);
};

export const getJSONDate = selectedDateTo => {
  return new Date(selectedDateTo).toJSON();
};
