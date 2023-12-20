import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostContentType } from '../../../model/interface';

const postContent = async (newContent: PostContentType) => {
  const response = await authApi.post('/posts', newContent);
  return response.data;
};

const usePostContentMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
  return {
    postContentMutate: mutation.mutate,
    isPostContentLoading: mutation.isLoading,
  };
};

export default usePostContentMutate;
