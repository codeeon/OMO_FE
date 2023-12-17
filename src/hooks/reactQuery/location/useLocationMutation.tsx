import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';

const postLocation: MutationFunction<
  void,
  { contentId: number | undefined }
> = async ({ contentId }) => {
  const response = await instance.post(`/posts/${contentId}/like`);
  return response.data;
};

const usePostLikeMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined }
  >(postLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostLikeMutation;
