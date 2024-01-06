import { PostCommentType } from '../../../model/interface';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const postComment: MutationFunction<
  void,
  { contentId: number | undefined; newComment: PostCommentType }
> = async ({ contentId, newComment }) => {
  const response = await authApi.post(
    `/api/posts/${contentId}/comments`,
    newComment,
  );
  // console.log(response.data);
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
      queryClient.invalidateQueries(['comments', contentId]);
      toast.success('댓글이 성공적으로 등록되었습니다.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
    onError: () => {
      toast.error('로그인 후 이용해주세요.', {
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
    sdf: mutation.error,
  };
};

export default usePostCommentQuery;
