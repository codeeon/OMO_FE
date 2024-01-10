import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';
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
      toast.success('북마크에 저장되었습니다.', {
        position: 'top-right',
        duration: 3000,
        style: { fontSize: '14px' },
      });
    },
    onError: (err, brandId, context) => {
      queryClient.setQueryData('bookmarkPlaces', context?.previousLocationData);
      toast.error('북마크 삭제에 실패했습니다.', {
        position: 'top-right',
        duration: 3000,
        style: { fontSize: '14px' },
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
