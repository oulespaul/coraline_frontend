import apiAxios from "shared/apis/apiAxios";

export default function postUploadImage(file) {
  const form = new FormData();
  form.append("file", file);

  return apiAxios.post(`/profile/uploadImage`, form);
}
