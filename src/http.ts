import axios, { type AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080',
      timeout: 10000,
      withCredentials: true,
    });
  }
}

const http = new Http().instance;
export default http;
