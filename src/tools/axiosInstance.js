import axios from 'axios'
import {url} from './params'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
export const axiosInstance = axios.create({
    baseURL: url,
    responseType: "json"
  });

  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Token ${token}` : '';
    return config;
  });