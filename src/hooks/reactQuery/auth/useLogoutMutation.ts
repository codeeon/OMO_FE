import { useMutation } from 'react-query';
import authAuth from '../../../axios/authAuth';

interface LoginData {
  email: string;
  password: string;
}

const postLogin = async () => {
  const response = await authAuth.post('/logout');
};

const useLogoutMutation = () => {
  const mutation = useMutation<void, unknown, { userData: LoginData }>(
    postLogin,
    {
      onSuccess: () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userId');
      },
    },
  );
  return {
    logoutMutate: mutation.mutate,
    isLogoutSuccess: mutation.isSuccess,
  };
};

export default useLogoutMutation;
