import { QueryClient, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import toast from 'react-hot-toast';

const postBookmark = async (locationId: number | undefined) => {
  const response = await authApi.post(`/api/posts/${locationId}/bookmark`);
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
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarkPlaces');
      toast.success('북마크에 저장되었습니다.', {
        position: 'bottom-right',
        duration: 4000,
      });
    },
    onError: (context) => {
      queryClient.setQueryData('bookmarkPlaces', context?.previousLocationData);
      toast.error('북마크 삭제에 실패했습니다.', {
        position: 'bottom-right',
        duration: 4000,
      });
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
