import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.defaults.withCredentials = true;

api.interceptors.response.use(axios.defaults, error => {
  const { message, response } = error;
  if (error.code === 'ECONNABORTED') {
    const eTimeout = new Error('Request take longer than expected. Aborting process');
    return Promise.reject(eTimeout);
  }

  if (axios.isCancel(error)) {
    return Promise.reject(new Error('Request is cancelled'));
  }

  let err = message;
  if (response) {
    if (response.data.errors) {
      err = response.data.errors;
      return Promise.reject(err);
    }
    if (response.data.message) {
      err = response.data.message;
    }
  }

  return Promise.reject(err);
});

// Source: https://stackoverflow.com/a/42483509
const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}
const apiGet = (url, axiosParameters) => api.get(url, axiosParameters);

const apiPost = (url, data, axiosParameters) => api.post(url, data, axiosParameters);

const apiPostFormData = (url, data, axiosParameters) => {
  const formData = new FormData();
  buildFormData(formData, data);

  return apiPost(url, formData, axiosParameters);
};

const apiPut = (url, data, axiosParameters) => api.put(url, data, axiosParameters);

const apiDelete = (url, axiosParameters) => api.delete(url, axiosParameters);

export {
  api,
  apiGet,
  apiPost,
  apiPostFormData,
  apiPut,
  apiDelete
};
