import { apiDelete, apiGet, apiPostFormData, apiPut } from './api';

const indexOutlet = params => apiGet('/api/outlets', { params });
const storeOutlet = data => apiPostFormData('/api/outlets', data);
const showOutlet = id => apiGet(`/api/outlets/${id}`);
const updateOutlet = (id, data) => apiPut(`/api/outlets/${id}`, data);
const destroyOutlet = id => apiDelete(`/api/outlets/${id}`);

const getDropdownsOutlet = params => apiGet(`/api/outlets/dropdowns`, { params });

export {
  indexOutlet,
  storeOutlet,
  showOutlet,
  updateOutlet,
  destroyOutlet,
  getDropdownsOutlet
};
