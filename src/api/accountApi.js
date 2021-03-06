import axiosClient from './axiosClient';

const accountApi = {
  getAll: (params) => {
    const payload = new URLSearchParams(params);
    const url = `pub/v1/account?${payload}`;
    return axiosClient.get(url);
  },

  search: (params) => {
    var payload = '';
    for (var key in params) {
      if (payload != '') {
        payload += '&';
      }
      payload += key + '=' + params[key];
    }
    // const payload = encodeURI(params);
    const url = `pub/v1/account/search?${payload}`;
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
