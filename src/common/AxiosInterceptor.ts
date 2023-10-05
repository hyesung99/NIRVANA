import { isAxiosError } from 'axios';
import { axiosInstance } from '@apis/axiosInstanse';

import NirvanaLocalStorage from '@utils/NirvanaLocalStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AxiosInterceptorsProps {
  children: React.ReactNode;
}

const AxiosInterceptors = ({ children }: AxiosInterceptorsProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = NirvanaLocalStorage.getToken('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        // 200번대의 응답 코드인 경우
        return response;
      },
      (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          NirvanaLocalStorage.deleteToken('token');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default AxiosInterceptors;
