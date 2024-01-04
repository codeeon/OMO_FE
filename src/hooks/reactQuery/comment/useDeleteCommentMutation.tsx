import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const deleteComment: MutationFunction<
  void,
  {
    contentId: number | undefined;
    commentId: number | undefined;
  }
> = async ({ contentId, commentId }) => {
  const response = await authApi.delete(
    `/api/posts/${contentId}/comments/${commentId}`,
  );
  return response.data;
};

const useDeleteCommentMutation = ({ contentId }: { contentId: number }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined; commentId: number | undefined }
  >(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', contentId]);
      toast.success('댓글이 성공적으로 삭제되었어요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteCommentMutation;
