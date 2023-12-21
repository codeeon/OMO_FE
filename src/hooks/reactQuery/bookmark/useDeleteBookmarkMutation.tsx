import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';

const deleteLike: MutationFunction<
  void,
  { postId: number | undefined }
> = async ({ postId }) => {
  const response = await authApi.delete(`/posts/${postId}/like`);
  return response.data;
};

const useDeleteLikeMutation = (postId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, { postId: number | undefined }>(
    deleteLike,
    {
      // Mutate 실행되기 전 onMutate로 낙관적 업데이트 작업.
      onMutate: async ({ postId }) => {
        // 실행중인 refetch 취소시키기.
        queryClient.cancelQueries(['posts', postId]);
        // 이전 쿼리값의 스냅샷
        const previousPostData: PostDetailType | undefined =
          queryClient.getQueryData(['posts', postId]);

        // setQueryData로 좋아요를 반영하여 Optimistic Update.
        if (previousPostData) {
          const updatedPostDat = {
            ...previousPostData,
            likeCount: previousPostData.likeCount - 1,
          };
          queryClient.setQueryData(['posts', postId], updatedPostDat);
        }
        // 에러 처리에 사용할 이전 쿼리값의 스냅샷을 context로 반환.
        return { previousPostData };
      },

      // 에러시 onMutate에서 리턴한 이전 쿼리값의 스냅샷으로 롤백.
      onError: (err, brandId, context) => {
        queryClient.setQueryData(['post', postId], context?.previousPostData);
      },

      // 성공 혹은 실패시 쿼리 무효화로 데이터 업데이트.
      onSettled: () => {
        queryClient.invalidateQueries(['posts', postId]);
      },
    },
  );
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteLikeMutation;
