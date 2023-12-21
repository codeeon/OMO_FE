import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';

const deleteContent = async (contentId: number | undefined) => {
  return await authApi.delete(`posts/${contentId}`);
};

const useDeleteContentMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteContentMutation;
