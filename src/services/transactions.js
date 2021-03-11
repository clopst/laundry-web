import { apiDelete, apiGet, apiPost, apiPostFormData, apiPut } from './api';

const indexTransaction = params => apiGet('/api/transactions', { params });
const storeTransaction = data => apiPostFormData('/api/transactions', data);
const showTransaction = id => apiGet(`/api/transactions/${id}`);
const updateTransaction = (id, data) => apiPut(`/api/transactions/${id}`, data);
const destroyTransaction = id => apiDelete(`/api/transactions/${id}`);

const getDropdownsTransaction = params => apiGet(`/api/transactions/dropdowns`, { params });
const changeStatusTransaction = (id, data) => apiPost(`/api/transactions/${id}/change-status`, data);

const exportTransaction = params => apiGet(`/api/transactions/export`, { params, responseType: 'blob' });

export {
  indexTransaction,
  storeTransaction,
  showTransaction,
  updateTransaction,
  destroyTransaction,
  getDropdownsTransaction,
  changeStatusTransaction,
  exportTransaction
};
