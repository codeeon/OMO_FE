import { useNavigate } from 'react-router-dom';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import auth from './auth';

const authAuth: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_AUTH_URL,
});

authAuth.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');

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
  (response: AxiosResponse) => {
    return response;
  },

  async (error) => {
    // console.log('에러 발생 -> ', error);
    // const req = error.config;

    if (error.response?.status === 401) {
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (refreshToken) {
          // console.log('try 진입');

          const refreshResponse = await auth.post('/tokens/refresh', null, {
            headers: {
              refreshToken: `${refreshToken}`,
            },
          });

          // console.log('리프레쉬 응답 데이터 -> ', refreshResponse.headers);

          const newAccessToken = refreshResponse.headers.authorization;
          const newRefreshToken = refreshResponse.headers.refreshtoken;
          const newUserId = refreshResponse.data.userId;

          sessionStorage.setItem('accessToken', newAccessToken);
          sessionStorage.setItem('refreshToken', newRefreshToken);
          sessionStorage.setItem('userId', newUserId);
        } else {
          alert('로그인이 만료되었습니다. 다시 로그인 후 이용해 주세요.');
          const navigate = useNavigate();
          navigate('/');
        }
      } catch (refreshError) {
        // console.error('인증 외 오류 -> ', refreshError);
      }
    }
    // console.log('응답 인터셉터 에러 -> ', error);
  },
);

export default authAuth;
