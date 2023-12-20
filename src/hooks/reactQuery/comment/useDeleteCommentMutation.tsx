import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/apis';
import authApi from '../../../axios/authApi';

const deleteComment: MutationFunction<
  void,
  {
    contentId: number | undefined;
    commentId: number | undefined;
  }
> = async ({ contentId, commentId }) => {
  const response = await authApi.delete(
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
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteCommentMutation;
