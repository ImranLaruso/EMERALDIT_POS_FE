import http from './http';

export async function getReceiveList() {
  return await http.get('/receives', { limit: 20 });
}

export async function getReceiveById(id) {
  return await http.get(`./receives/${id}`);
}

export async function updateReceiveById(id, body) {
  return await http.put(`./receives/${id}`, body);
}

export async function createReceive(body) {
  return await http.post('./receives', body);
}

export async function deleteReceive(id) {
  return await http.deleteById('./receives', id);
}

export async function getLatestItemReceiveByItemId(itemId) {
  return await http.get(`/receives/latest-item-receive-by-item-id/${itemId}`);
}
