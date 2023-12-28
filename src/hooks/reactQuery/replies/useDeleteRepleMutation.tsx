import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';

const deleteReple: MutationFunction<
  void,
  {
    contentId: number | undefined;
    commentId: number | undefined;
    replyId: number | undefined;
  }
> = async ({ contentId, commentId, replyId }) => {
  const response = await authApi.delete(
    `/posts/${contentId}/comments/${commentId}/replies/${replyId}`,
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
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteRepleMutation;
