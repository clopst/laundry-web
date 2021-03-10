import { apiDelete, apiGet, apiPost, apiPostFormData } from './api';

const indexUser = params => apiGet('/api/users', { params });
const storeUser = data => apiPostFormData('/api/users', data);
const showUser = id => apiGet(`/api/users/${id}`);
const updateUser = (id, data) => apiPostFormData(`/api/users/${id}`, data);
const destroyUser = id => apiDelete(`/api/users/${id}`);

const changePasswordUser = (id, data) => apiPost(`/api/users/${id}/change-password`, data);

export {
  indexUser,
  storeUser,
  showUser,
  updateUser,
  destroyUser,
  changePasswordUser
};
