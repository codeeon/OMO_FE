import { useMutation } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';
interface LoginData {
  email: string;
  password: string;
}

const postLogin = async () => {
  const response = await authApi.post('/auth/logout');
  // console.log(response);
};

const useLogoutMutation = () => {
  const mutation = useMutation<void, unknown, { userData: LoginData }>(
    postLogin,
    {
      // onMutate: () => {
      //   // onSuccess는 - 혹시나 서버에 이미 토큰이 지워졌다면? 여기 토큰은 안 지워짐,
      //   // 차라리 서버에 있는 토큰 데이터가 안 지워지는 게 나아서, onMutate로 optimistic update를 쓰고 에러 핸들링을 조정?
      //   sessionStorage.removeItem('accessToken');
      //   sessionStorage.removeItem('refreshToken');
      //   sessionStorage.removeItem('userId');
      //
      //   // 이렇게 하면 토큰이 먼저 삭제되기에, 에러가 발생.
      // },
      onSuccess: () => {
        // console.log('로그아웃 성공');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userId');
        toast.success('로그아웃이 완료되었습니다.', {
          position: 'bottom-right',
          duration: 4000,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );
  return {
    logoutMutate: mutation.mutate,
    isLogoutSuccess: mutation.isSuccess,
  };
};

export default useLogoutMutation;
