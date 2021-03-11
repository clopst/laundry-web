const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8000';
const backendStorageUrl = process.env.BACKEND_STORAGE_URL ?? `${backendUrl}/storage`;
const getStorageUrl = (path) => backendStorageUrl + '/' + path;

export {
  backendUrl,
  backendStorageUrl,
  getStorageUrl
};
