import axios from "axios";
import { API_BASE_URL } from '@/constants/Api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})