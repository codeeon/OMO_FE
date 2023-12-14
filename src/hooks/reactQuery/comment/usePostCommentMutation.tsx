import axios from 'axios';
import { CommentPostType, CommentType } from '../../../model/interface';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';

const postComment: MutationFunction<
  void,
  { contentId: number | undefined; newComment: CommentPostType }
> = async ({ contentId, newComment }) => {
  const response = await instance.post(
    `/posts/${contentId}/comments`,
    newComment,
  );
  return response.data;
};

const usePostCommentQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined; newComment: CommentPostType }
  >(postComment, {
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
