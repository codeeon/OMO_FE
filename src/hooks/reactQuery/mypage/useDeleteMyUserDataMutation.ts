import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import authAuth from '../../../axios/authAuth';

const deleteMyData = async () => {
  const response = await authAuth.delete(`/withdraw`);
};

const useDeleteMyDataMutation = () => {
  const navigate = useNavigate();
  const mutation = useMutation(deleteMyData, {
    onSuccess: () => {
      alert('회원 탈퇴를 완료하였습니다.');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      navigate('/');
    },
  });
  return {
    useDeleteMyDataMutate: mutation.mutate,
  };
};

export default useDeleteMyDataMutation;
