import axios from 'axios';
import { ContentType } from '../model/interface';
import { useMutation, useQueryClient } from 'react-query';

const postContent = async (newContent: ContentType) => {
  const response = await axios.post(
    'http://localhost:3001/contents',
    newContent,
  );
  return response.data;
};

const usePostContentQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostContentQuery;
