import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';

const deleteLike: MutationFunction<
  void,
  { contentId: number | undefined }
> = async ({ contentId }) => {
  const response = await instance.delete(`/posts/${contentId}/like`);
  return response.data;
};

const useDeleteLikeMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined }
  >(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteLikeMutation;
