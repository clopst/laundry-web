import { apiDelete, apiGet, apiPostFormData } from "./api";

const indexCustomer = params => apiGet('/api/customers', { params });
const storeCustomer = data => apiPostFormData('/api/customers', data);
const showCustomer = id => apiGet(`/api/customers/${id}`);
const updateCustomer = (id, data) => apiPostFormData(`/api/customers/${id}`, data);
const destroyCustomer = id => apiDelete(`/api/customers/${id}`);

export {
  indexCustomer,
  storeCustomer,
  showCustomer,
  updateCustomer,
  destroyCustomer
};
