import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // 액세스 토큰이 있다면 헤더에 추가
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
  function () {},
);

instance

export default instance;
