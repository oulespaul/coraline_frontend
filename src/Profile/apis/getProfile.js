import apiAxios from "shared/apis/apiAxios";

export default function getProfile() {
  return apiAxios.get("/profile");
}
