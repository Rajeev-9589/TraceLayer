import axios from 'axios';

const API_BASE = 'http://localhost:5500';

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
