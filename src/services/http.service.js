import axios from "axios";
import store from '../store';
import router from "../router";

const config = {
  baseURL: 'http://localhost:8080/api/'
};

const httpClient = axios.create(config);

const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${store.getters.accessToken}`;
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      router.push({name: 'Login'});
    }
    return Promise.reject(error);
  }
);

export default httpClient;
