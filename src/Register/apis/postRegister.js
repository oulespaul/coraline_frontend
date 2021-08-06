import apiAxios from "shared/apis/apiAxios";

export default function postRegister(credentials) {
  return apiAxios.post("/auth/signup", credentials);
}
