import { apiGet } from './api';

const indexDashboard = params => apiGet('/api/dashboard', { params })

export {
  indexDashboard
};
