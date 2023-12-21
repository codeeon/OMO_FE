import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostContentType } from '../../../model/interface';

const patchContent: MutationFunction<
  void,
  { postId: number | undefined; newPost: PostContentType }
> = async ({ postId, newPost }) => {
  const response = await authApi.patch(`/posts/${postId}`, newPost);
  return response.data;
};

const usePatchPostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { postId: number | undefined; newPost: PostContentType }
  >(patchContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
  return {
    patchMutate: mutation.mutate,
    isPatchLoading: mutation.isLoading,
  };
};

export default usePatchPostMutation;
