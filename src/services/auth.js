import { apiGet, apiPost, apiPostFormData } from './api';

const getSanctumCookie = params => apiGet('/sanctum/csrf-cookie/', { params });
const attemptLogin = data => apiPost('/login', data);
const attemptLogout = data => apiPost('/logout', data);
const getLoggedInUser = params => apiGet('/api/auth', { params });
const updateProfile = data => apiPostFormData('/api/auth/update-profile', data);
const changePassword = data => apiPost('/api/auth/change-password', data);

export {
  getSanctumCookie,
  attemptLogin,
  attemptLogout,
  getLoggedInUser,
  updateProfile,
  changePassword
};

