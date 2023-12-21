import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';

const postBookmark: MutationFunction<
  void,
  { locationId: number | undefined }
> = async ({ locationId }) => {
  const response = await authApi.post(`/posts/${locationId}/bookmark`);
  return response.data;
};

const usePostBookmarkMutation = (locationId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { locationId: number | undefined }
  >(postBookmark, {
    onMutate: async ({ locationId }) => {
      queryClient.cancelQueries(['location', locationId]);
      const previousLocationData: PostDetailType | undefined =
        queryClient.getQueryData(['location', locationId]);

      if (previousLocationData) {
        const updatedPostDat = {
          ...previousLocationData,
          likeCount: previousLocationData.likeCount + 1,
        };
        queryClient.setQueryData(['location', locationId], updatedPostDat);
      }
      return { previousPostData };
    },
    onError: (err, brandId, context) => {
      queryClient.setQueryData(['post', locationId], context?.previousPostData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['location', locationId]);
    },
  });
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostBookmarkMutation;
