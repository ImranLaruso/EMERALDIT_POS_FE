import http from './http';

export async function getEmployeeList() {
  return await http.get('/employees', { limit: 20 });
}

export async function getEmployeeById(id) {
  return await http.get(`./employees/${id}`);
}

export async function updateEmployeeById(id, body) {
  return await http.put(`./employees/${id}`, body);
}

export async function createEmployee(body) {
  return await http.post('./employees', body);
}

export async function deleteEmployee(id) {
  return await http.deleteById('./employees', id);
}
