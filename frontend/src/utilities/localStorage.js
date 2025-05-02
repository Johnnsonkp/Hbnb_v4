export function getJWTToken(name) {
  return localStorage.getItem(name);
}