import { PostCommentType } from '../../../model/interface';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';

const postReple: MutationFunction<
  void,
  {
    postId: number | undefined;
    commentId: number | undefined;
    newComment: PostCommentType;
  }
> = async ({ postId, commentId, newComment }) => {
  const response = await authApi.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    newComment,
  );
  return response.data;
};

const usePostRepleMutation = ({
  postId,
  commentId,
  handleModalOpen,
}: {
  postId: number | undefined;
  commentId: number | undefined;
  handleModalOpen: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    {
      postId: number | undefined;
      commentId: number | undefined;
      newComment: PostCommentType;
    }
  >(postReple, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId]);
      handleModalOpen();
    },
    onError: (error) => {
      handleModalOpen();
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
    isPostError: mutation.isError,
    isPostSuccess: mutation.isSuccess,
  };
};

export default usePostRepleMutation;
