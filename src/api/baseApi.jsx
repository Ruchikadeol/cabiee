import axios from 'axios'
import qs from 'qs'
const { VITE_BASE_URL } = import.meta.env;
const apiClient = axios.create({
  baseURL:VITE_BASE_URL,
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const makeApiCall = async (method, url, data = {}, additionalHeaders = {}) => {
  const config = {
    method,
    url,
    headers: additionalHeaders,
    params: method.toLowerCase() === 'get' ? data : {},
    data: method.toLowerCase() !== 'get' ? data : {},
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  return await apiClient.request(config)
}

export default makeApiCall