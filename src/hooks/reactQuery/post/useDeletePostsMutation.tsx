import { useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';

const deleteContent = async (contentId: number | undefined) => {
  return await instance.delete(`posts/${contentId}`);
};

const useDeleteContentMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteContentMutation;
