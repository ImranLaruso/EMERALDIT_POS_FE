import http from './http';

export async function getCustomerList() {
  return await http.get('/customers', { limit: 20 });
}

export async function getCustomerById(id) {
  return await http.get(`./customers/${id}`);
}

export async function updateCustomerById(id, body) {
  return await http.put(`./customers/${id}`, body);
}

export async function createCustomer(body) {
  return await http.post('./customers', body);
}

export async function deleteCustomer(id) {
  return await http.deleteById('./customers', id);
}

export async function searchCustomer(id) {
  return await http.get(`/customers/search/${id}`, id);
}
