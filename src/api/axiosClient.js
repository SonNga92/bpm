import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.47.9.236:8810',
  timeout: 5000,
  headers: {
    'content-type': 'application/json,'
  }
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
