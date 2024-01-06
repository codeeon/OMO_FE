import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const deleteReple: MutationFunction<
  void,
  {
    contentId: number | undefined;
    commentId: number | undefined;
    replyId: number | undefined;
  }
> = async ({ contentId, commentId, replyId }) => {
  const response = await authApi.delete(
    `/api/posts/${contentId}/comments/${commentId}/replies/${replyId}`,
  );
  return response.data;
};

const useDeleteRepleMutation = ({ contentId }: { contentId: number }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    {
      contentId: number | undefined;
      commentId: number | undefined;
      replyId: number | undefined;
    }
  >(deleteReple, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', contentId]);
      toast.success('대댓글이 성공적으로 삭제되었어요.', {
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

export default useDeleteRepleMutation;
