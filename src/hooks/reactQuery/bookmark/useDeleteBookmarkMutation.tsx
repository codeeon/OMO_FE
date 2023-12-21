import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';

const deleteBookmark = async (locationId: number | undefined) => {
  const response = await authApi.delete(`/posts/${locationId}/bookmark`);
  return response.data;
};

const useDeleteBookmarkMutation = (locationId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { locationId: number | undefined }
  >(() => deleteBookmark(locationId), {
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
    deletebookmarkingMutate: mutation.mutate,
    isDeleteBookmarkingLoading: mutation.isLoading,
  };
};

export default useDeleteBookmarkMutation;
