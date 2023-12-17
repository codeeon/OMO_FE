import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';

const deleteComment: MutationFunction<
  void,
  {
    contentId: number | undefined;
    commentId: number | undefined;
  }
> = async ({ contentId, commentId }) => {
  const response = await instance.delete(
    `/posts/${contentId}/comments/${commentId}`,
  );
  return response.data;
};

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { contentId: number | undefined; commentId: number | undefined }
  >(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteCommentMutation;
