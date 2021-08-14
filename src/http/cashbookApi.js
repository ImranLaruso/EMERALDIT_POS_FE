import http from './http';

export async function getCashbookList() {
  return await http.get('/cashbooks', { limit: 20 });
}

export async function getFilteredCashbooks(startDate, endDate) {
  return await http.get(
    `/cashbooks?startDate=${startDate}&endDate=${endDate}`,
    { limit: 20 }
  );
}

export async function getCashbookById(id) {
  return await http.get(`./cashbooks/${id}`);
}

export async function updateCashbookById(id, body) {
  return await http.put(`./cashbooks/${id}`, body);
}

export async function createCashbook(body) {
  return await http.post('./cashbooks', body);
}

export async function deleteCashbook(id) {
  return await http.deleteById('./cashbooks', id);
}
