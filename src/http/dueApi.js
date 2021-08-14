import http from './http';

export async function getDuesByCustomerId(id) {
  return await http.get(`due/search-by-customer-id/${id}`);
}
