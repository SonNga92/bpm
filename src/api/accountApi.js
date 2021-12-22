import axiosClient from './axiosClient';

const accountApi = {
  getAll: (params) => {
    const url = '/account';
    return axiosClient.get(url, params);
  },

  search: (params) => {
    const url = '/account';
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = '/account/add';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `/account/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `/account/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default accountApi;
