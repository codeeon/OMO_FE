import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import authApi from '../../../axios/authApi';
import useLogoutMutation from './useLogoutMutation';
import toast from 'react-hot-toast';

const deleteMyData = async () => {
  const response = await authApi.delete(`/auth/withdraw`);
};

const useDeleteMyDataMutation = () => {
  const navigate = useNavigate();
  const { logoutMutate } = useLogoutMutation();

  const mutation = useMutation(deleteMyData, {
    onSuccess: () => {
      toast.success('회원 탈퇴를 완료하였습니다.', {
        position: 'bottom-right',
        duration: 4000,
      });
      navigate('/');
    },
    onMutate: () => {
      logoutMutate();
    },
  });
  return {
    useDeleteMyDataMutate: mutation.mutate,
  };
};

export default useDeleteMyDataMutation;
