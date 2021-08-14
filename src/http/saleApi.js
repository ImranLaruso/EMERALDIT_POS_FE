import http from './http';

export async function getSaleList() {
  return await http.get('/sales', { limit: 20 });
}

export async function getSaleById(id) {
  return await http.get(`./sales/${id}`);
}

export async function updateSaleById(id, body) {
  return await http.put(`./sales/${id}`, body);
}

export async function createSale(body) {
  return await http.post('./sales', body);
}

export async function deleteSale(id) {
  return await http.deleteById('./sales', id);
}
