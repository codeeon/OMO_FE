import { PostCommentType } from '../../../model/interface';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const postReple: MutationFunction<
  void,
  {
    postId: number | undefined;
    commentId: number | undefined;
    newComment: PostCommentType;
  }
> = async ({ postId, commentId, newComment }) => {
  const response = await authApi.post(
    `/api/posts/${postId}/comments/${commentId}/replies`,
    newComment,
  );
  return response.data;
};

const usePostRepleMutation = ({
  postId,
  commentId,
}: {
  postId: number | undefined;
  commentId: number | undefined;
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
      toast.success('댓글이 성공적으로 등록되었습니다.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
    onError: () => {
      toast.error('로그인 후 사용해주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
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
