import { apiDelete, apiGet, apiPostFormData, apiPut } from './api';

const indexProduct = params => apiGet('/api/products', { params });
const storeProduct = data => apiPostFormData('/api/products', data);
const showProduct = id => apiGet(`/api/products/${id}`);
const updateProduct = (id, data) => apiPut(`/api/products/${id}`, data);
const destroyProduct = id => apiDelete(`/api/products/${id}`);

const getDropdownsProduct = params => apiGet(`/api/products/dropdowns`, { params });

export {
  indexProduct,
  storeProduct,
  showProduct,
  updateProduct,
  destroyProduct,
  getDropdownsProduct
};
