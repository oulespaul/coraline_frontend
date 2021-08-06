import apiAxios from "shared/apis/apiAxios";

export default function getProfilePublish(profileId) {
  return apiAxios.get(`/profile/${profileId}`);
}
