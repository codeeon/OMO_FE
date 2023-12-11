import axios from 'axios';
import { CommentType } from '../model/interface';
import { useMutation, useQueryClient } from 'react-query';

const postComment = async (newComment: CommentType) => {
  const response = await axios.post(
    'http://localhost:3001/comments',
    newComment,
  );
  return response.data;
};

const usePostCommentQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostCommentQuery;
