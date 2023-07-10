/** @format */

import axios from 'axios';

export const apiProduction = process.env.REACT_APP_BASE_API_PROD;
export const apiDev = process.env.REACT_APP_BASE_API_DEV;

const baseURL = apiDev;

const axiosClient = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (req) {
    const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
    const token = dataUser.accessToken;

    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (res) {
    return res.data;
  },

  function (error) {
    return Promise.reject(error);
  },
);
export default axiosClient;