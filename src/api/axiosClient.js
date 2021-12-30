import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.47.9.202:8088',
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
