import axiosClient from './axiosClient';

const bankTransactionResponseApi = {
  getAll: (params) => {
    const payload = new URLSearchParams(params);
    const url = `/bank-transaction-response?${payload}`;
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
    const url = `/bank-transaction-response/search?${payload}`;
    return axiosClient.get(url, params);
  },

  add: (params) => {
    const url = '/bank-transaction-response/add';
    return axiosClient.post(url, params);
  },

  edit: (params, id) => {
    const url = `/bank-transaction-response/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (params) => {
    const url = `/bank-transaction-response/${params._id}`;
    return axiosClient.delete(url, params);
  }
};

export default bankTransactionResponseApi;
