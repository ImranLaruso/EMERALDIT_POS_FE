import http from './http';

export async function getStockPerItem(searchWord) {
  return await http.get(`/items/stock-per-item?searchWord=${searchWord}`, {
    limit: 20,
  });
}
