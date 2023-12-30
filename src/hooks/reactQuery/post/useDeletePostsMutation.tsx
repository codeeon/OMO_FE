import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const deleteContent = async (contentId: number | undefined) => {
  return await authApi.delete(`posts/${contentId}`);
};

const useDeleteContentMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('게시물이 성공적으로 삭제되었어요.', {
        position: 'bottom-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteContentMutation;
