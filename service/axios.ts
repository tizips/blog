import axios from 'axios';

export const $axios = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: false,
  });
};