import apiAxios from "shared/apis/apiAxios";

export default function createProfile(profile) {
  return apiAxios.post("/profile", profile);
}
