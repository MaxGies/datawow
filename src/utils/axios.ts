import axios from "axios";

const defaultOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
  timeout: 15000,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(async (config) => {
  config.baseURL = "http://localhost:3001";
  return config;
});

export default instance;
