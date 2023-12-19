import axios from 'axios';
import { ContentType } from '../../../model/interface';
import { useMutation, useQueryClient } from 'react-query';

const postContent = async (newContent: ContentType) => {
  const response = await axios.post('https://tonadus.shop/posts', newContent);
  return response.data;
};

const usePostContentMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    postContentMutate: mutation.mutate,
    isPostContentLoading: mutation.isLoading,
  };
};

export default usePostContentMutate;
