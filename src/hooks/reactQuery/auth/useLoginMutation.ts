import { MutationFunction, UseMutationResult, useMutation } from 'react-query';
import api from '../../../axios/api';

interface LoginData {
  email: string;
  password: string;
}

const postLogin: MutationFunction<void, { userData: LoginData }> = async (
  userData: LoginData,
) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

const useLoginMutation = (): UseMutationResult<
  void,
  unknown,
  { userData: LoginData }
> => {
  const mutation = useMutation<void, unknown, { userData: LoginData }>(
    postLogin,
    {
      onSuccess: (response) => {
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        const userId = response.data.userId;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userId', userId);
        // TODO 로그인 성공 alert 추가
      },
      onError: (error) => {
        // TODO 로그인 성공 alert 추가
      },
    },
  );
  return {
    loginMutate: mutation.mutate,
    isLoginLoading: mutation.isLoading,
    isLoginError: mutation.isError,
    isLoginSuccess: mutation.isSuccess,
  };
};

export default useLoginMutation;
