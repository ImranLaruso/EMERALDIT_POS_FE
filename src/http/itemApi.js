import http from './http';

export async function getItemList() {
  return await http.get('/items', { limit: 20 });
}

export async function itemSearch(param) {
  return await http.get(`/items/search/${param}`, { limit: 20 });
}

export async function getItemDetails() {
  return await http.get(`/items/item-details`, {
    limit: 20,
  });
}

export async function getAllItemDetails(searchType, searchValue, isBranded) {
  let queryStrings = `itemType=${isBranded ? 'branded' : undefined}`;

  if (searchValue) {
    queryStrings += `&${searchType}=${searchValue.split('-')[0]}`;
  }

  return await http.get(`/items/item-details-search?${queryStrings}`, {
    limit: 20,
  });
}

export async function itemSearchForReceives(param) {
  return await http.get(`items/item-search/${param}`, { limit: 20 });
}

export async function getItemById(id) {
  return await http.get(`items/${id}`);
}

export async function updateItemById(id, body) {
  return await http.put(`./items/${id}`, body);
}

export async function createItem(body) {
  return await http.post('./items', body);
}

export async function deleteItem(id) {
  return await http.deleteById('./items', id);
}

export async function deleteItemStat(id) {
  return await http.deleteById('/itemStats', id);
}

export async function getTotalStockValue() {
  return await http.get('/itemStats/total-stock-value');
}
