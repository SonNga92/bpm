import axiosClient from './axiosClient';

const bankTransactionRequestApi = {
  getAll: (params) => {
    const payload = new URLSearchParams(params);
    const url = `pub/v1/bank-notification-inbound?${payload}`;
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
    const url = `pub/v1/bank-notification-inbound/search?${payload}`;
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = 'pub/v1/bank-notification-inbound/add';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `pub/v1/bank-notification-inbound/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `pub/v1/bank-notification-inbound/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default bankTransactionRequestApi;
