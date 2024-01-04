import { useNavigate } from 'react-router-dom';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import api from './api';

// 타입 추가
interface RefreshResponseData {
  userId: string;
}

const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
});

authApi.interceptors.request.use(
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
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (refreshToken) {
          const refreshResponse = await api.post<
            null,
            AxiosResponse<RefreshResponseData>
          >('/auth/tokens/refresh', null, {
            headers: {
              refreshToken: `${refreshToken}`,
            },
          });

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

    return Promise.reject(error);
  },
);

export default authApi;

// import { useNavigate } from 'react-router-dom';
// import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import api from './api';

// const authApi: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_SERVER_URL,
// });

// authApi.interceptors.request.use(
//   (config) => {
//     const accessToken = sessionStorage.getItem('accessToken');

//     if (accessToken) {
//       config.headers.Authorization = `${accessToken}`;
//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   },
// );

// authApi.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },

//   async (error) => {
//     // refreshToken이 만료되거나 미인증 상태일 때는 실행되지 않게끔 하기 위해, status의 code가 아닌, error.message === 'expired' 등을 이용하는 것이 나음.
//     if (error.response?.status === 401) {
//       try {
//         const refreshToken = sessionStorage.getItem('refreshToken');

//         if (refreshToken) {
//           const refreshResponse = await api.post('/auth/tokens/refresh', null, {
//             headers: {
//               refreshToken: `${refreshToken}`,
//             },
//           });

//           const newAccessToken = refreshResponse.headers.authorization;
//           const newRefreshToken = refreshResponse.headers.refreshtoken;
//           const newUserId = refreshResponse.data.userId;

//           sessionStorage.setItem('accessToken', newAccessToken);
//           sessionStorage.setItem('refreshToken', newRefreshToken);
//           sessionStorage.setItem('userId', newUserId);
//         } else {
//           alert('로그인이 만료되었습니다. 다시 로그인 후 이용해 주세요.');
//           const navigate = useNavigate();
//           navigate('/');
//         }
//       } catch (refreshError) {
//         // console.error('인증 외 오류 -> ', refreshError);
//       }
//     }
//   },
// );

// export default authApi;
