import http from "./http";

export async function sendAuthData(body) {
  return await http.post("/auth/login", body);
}
