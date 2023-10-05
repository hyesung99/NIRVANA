import axios from 'axios';
import { API_BASE_URL } from '@/constants/Api';
import NirvanaLocalStorage from '@utils/NirvanaLocalStorage';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: 'Bearer ' + NirvanaLocalStorage.getItem('token')
  }
});
