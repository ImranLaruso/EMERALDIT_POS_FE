import http from './http';

export async function getBrandsList() {
  return await http.get('/brands', { limit: 20 });
}

export async function createBrand(body) {
  return await http.post('/brands', body);
}

export async function updateBrandById(id, body) {
  return await http.put(`/brands/${id}`, body);
}

export async function deleteBrand(id) {
  return await http.deleteById('/brands', id);
}
