import axiosClient from './axiosClient';

const bankInfoApi = {
  getAll: (params) => {
    const payload = new URLSearchParams(params);
    const url = `pub/v1/bank-info?${payload}`;
    return axiosClient.get(url);
  },

  search: (params) => {
    const url = `pub/v1/bank-info/search`;
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = 'pub/v1/bank-info/add';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `pub/v1/bank-info/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `pub/v1/bank-info/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default bankInfoApi;
