
// import axios from 'axios';
// const DEPLOYED='https://e-commerce-server-production-0873.up.railway.app'
// const LOCALHOST='http://localhost:5454'

// export const API_BASE_URL = LOCALHOST

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// const token = localStorage.getItem('jwt');

// api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// api.defaults.headers.post['Content-Type'] = 'application/json';

// export default api;

// src/Api/api.js
import axios from 'axios';

// Use the environment variable, fallback to a default if not defined.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7014';

export { API_BASE_URL };

const api = axios.create({
  baseURL: API_BASE_URL,
});

// If a token is already stored in localStorage, set it as the default header
const token = localStorage.getItem('jwt');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Set default headers for POST requests
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
