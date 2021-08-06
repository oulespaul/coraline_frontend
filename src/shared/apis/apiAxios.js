import axios from "axios";

const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export default apiAxios;
