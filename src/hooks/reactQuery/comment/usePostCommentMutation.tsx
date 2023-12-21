import { PostCommentType } from '../../../model/interface';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';

const postComment: MutationFunction<
  void,
  { contentId: number | undefined; newComment: PostCommentType }
> = async ({ contentId, newComment }) => {
  const response = await authApi.post(
    `/posts/${contentId}/comments`,
    newComment,
  );
  return response.data;
};

const usePostCommentQuery = ({
  contentId,
}: {
  contentId: number | undefined;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined; newComment: PostCommentType }
  >(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', contentId]);
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostCommentQuery;
