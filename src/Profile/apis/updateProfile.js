import apiAxios from "shared/apis/apiAxios";

export default function updateProfile(profile, profileId) {
  return apiAxios.patch(`/profile/${profileId}`, profile);
}
