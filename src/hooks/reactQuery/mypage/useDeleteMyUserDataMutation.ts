import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import authApi from '../../../axios/authApi';
import useLogoutMutation from '../auth/useLogoutMutation';

const deleteMyData = async () => {
  const response = await authApi.delete(`/auth/withdraw`);
};

const useDeleteMyDataMutation = () => {
  const navigate = useNavigate();
  const { logoutMutate } = useLogoutMutation();

  const mutation = useMutation(deleteMyData, {
    onSuccess: () => {
      logoutMutate();
      alert('회원 탈퇴를 완료하였습니다.');
      navigate('/');
    },
  });
  return {
    useDeleteMyDataMutate: mutation.mutate,
  };
};

export default useDeleteMyDataMutation;
