import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role.toUpperCase();
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}
