import http from './http';

export async function getSupplierList() {
  return await http.get('/suppliers', { limit: 20 });
}

export async function getSupplierById(id) {
  return await http.get(`./suppliers/${id}`);
}

export async function updateSupplierById(id, body) {
  return await http.put(`./suppliers/${id}`, body);
}

export async function createSupplier(body) {
  return await http.post('./suppliers', body);
}

export async function deleteSupplier(id) {
  return await http.deleteById('./suppliers', id);
}
export async function searchSupplier(id) {
  return await http.get(`/suppliers/search/${id}`);
}
