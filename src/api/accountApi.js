import axiosClient from './axiosClient';

const accountApi = {
  getAll: (params) => {
    const url = 'pub/v1/account';
    return axiosClient.get(url, params);
  },

  search: (params) => {
    const url = 'pub/v1/account';
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = 'pub/v1/account/add';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `pub/v1/account/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `pub/v1/account/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default accountApi;
