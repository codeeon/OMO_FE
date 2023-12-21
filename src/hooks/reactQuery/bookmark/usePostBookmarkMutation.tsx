import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';

const postBookmark = async (locationId: number | undefined) => {
  const response = await authApi.post(`/posts/${locationId}/bookmark`);
  return response.data;
};

const usePostBookmarkMutation = (locationId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { locationId: number | undefined }
  >(() => postBookmark(locationId), {
    onMutate: async () => {
      queryClient.cancelQueries('bookmarkPlaces');
      const previousLocationData = queryClient.getQueryData('bookmarkPlaces');

      if (previousLocationData) {
        queryClient.setQueryData(['bookmarkPlaces'], previousLocationData);
      }
      return { previousLocationData };
    },
    onError: (err, brandId, context) => {
      queryClient.setQueryData('bookmarkPlaces', context?.previousLocationData);
    },

    onSettled: () => {
      queryClient.invalidateQueries('bookmarkPlaces');
    },
  });
  return {
    postBookmarkingMutate: mutation.mutate,
    isPostBookmarkingLoading: mutation.isLoading,
  };
};

export default usePostBookmarkMutation;
