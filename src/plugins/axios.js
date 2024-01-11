import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = BASE_URL;

const instance = axios.create({
  BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
