export const httpMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH'
};

export const DEFAULT_REQUEST_INIT = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: httpMethods.get
};

export const BASE_URL = "https://sahajtt.herokuapp.com/"
