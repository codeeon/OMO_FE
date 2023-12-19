import axios, { AxiosInstance, AxiosResponse } from 'axios';
import auth from './auth';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    // req는 에러가 발생한 axios 요청 (config 객체)
    const req = error.config;

    // _retry는 axios interceptor의 커스텀 플래그, 재시도 된 요청에 인터셉터 로직이 실행되는 것을 방지함
    if (error.response?.status === 401 && !req._retry) {
      req._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const refreshResponse = await auth.post(
          '/tokens/refresh',
          { refreshToken },
          { withCredentials: true },
        );

        req.headers['Authorization'] = `${refreshResponse.data.accessToken}`;
        return instance(req);
      } catch (refreshError) {
        console.error('토큰 새로 고침 실패:', refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
