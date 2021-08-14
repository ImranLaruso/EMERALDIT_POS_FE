import http from './http';

export async function getSettings() {
  return await http.get('/settings');
}

export async function getSettingsById(id) {
  return await http.get(`./settings/${id}`);
}

export async function updateSettingsById(id, body) {
  return await http.put(`./settings/1`, body);
}

export async function createSettings(body) {
  return await http.post('./settings', body);
}

export async function deleteSettings(id) {
  return await http.deleteById('./settings', id);
}
