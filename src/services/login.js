import { apiGet, apiPost } from './api';

const getSanctumCookie = params => apiGet('/sanctum/csrf-cookie/', { params });
const attemptLogin = data => apiPost('/login', data);
const attemptLogout = data => apiPost('/logout', data);
const getLoggedInUser = params => apiGet('/api/auth', { params });

export {
  getSanctumCookie,
  attemptLogin,
  attemptLogout,
  getLoggedInUser
};

