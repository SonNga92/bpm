import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/users';
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = '/users';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `/users/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default userApi;
