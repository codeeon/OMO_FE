import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostPatchType } from '../../../model/interface';
import toast from 'react-hot-toast';

const patchContent: MutationFunction<
  void,
  { postId: number | undefined; newPost: PostPatchType }
> = async ({ postId, newPost }) => {
  const response = await authApi.patch(`/api/posts/${postId}`, newPost);
  return response.data;
};

const usePatchPostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { postId: number | undefined; newPost: PostPatchType }
  >(patchContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('게시물 수정 성공!', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
      toast.remove('10');
    },
    onMutate: () => {
      toast.loading('게시물 업로드 중입니다...', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
        id: '10',
      });
    },
  });
  return {
    patchMutate: mutation.mutate,
    isPatchLoading: mutation.isLoading,
  };
};

export default usePatchPostMutation;
