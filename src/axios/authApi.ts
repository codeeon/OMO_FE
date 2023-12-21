import axios, { AxiosInstance, AxiosResponse } from 'axios';
import auth from './auth';

export const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  // withCredentials: true,
});

authApi.interceptors.request.use(
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

authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    console.log('에러 발생 -> ', error);
    const req = error.config;

    // _retry는 axios interceptor의 커스텀 플래그, 재시도 된 요청에 인터셉터 로직이 실행되는 것을 방지함
    if (
      (error.response?.status === 401 || error.response?.status === 500) &&
      !req._retry
    ) {
      req._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        console.log('try 진입');

        const refreshResponse = await auth.post(
          '/tokens/refresh',
          { refreshToken },
          // { withCredentials: true },
        );

        console.log('리프레쉬 응답 데이터 -> ', refreshResponse);

        // 새로 갱신된 토큰으로 원래 요청을 다시 시도
        req.headers['Authorization'] = `${refreshResponse.data.accessToken}`;
        return authApi(req);
      } catch (refreshError) {
        console.error('토큰 새로 고침 실패:', refreshError);
        throw refreshError;
      }
    } else {
      console.log('에러: 인가 문제는 아닌 듯');
    }
    console.log('응답 인터셉터 에러 -> ', error);
    return Promise.reject(error);
  },
);

export default authApi;
