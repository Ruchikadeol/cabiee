import axios from "axios";
import qs from "qs";

const { VITE_BASE_URL } = import.meta.env;

const apiClient = axios.create({
  baseURL: VITE_BASE_URL,
});

// Request Interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to catch 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token (optional)
      localStorage.removeItem("authToken");

      // Redirect to login
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Unified API Call Function
const makeApiCall = async (method, url, data = {}, additionalHeaders = {}) => {
  const config = {
    method,
    url,
    headers: additionalHeaders,
    params: method.toLowerCase() === "get" ? data : {},
    data: method.toLowerCase() !== "get" ? data : {},
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  };
  return await apiClient.request(config);
};

export default makeApiCall;
