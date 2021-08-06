import apiAxios from "./apiAxios";

export default function apiLogin(credentials) {
  return apiAxios.post("/auth/signin", credentials);
}
