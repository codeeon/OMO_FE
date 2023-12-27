import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostContentType } from '../../../model/interface';

const postContent = async (newContent: PostContentType) => {
  const formData = new FormData();
  formData.append('content', newContent.content);
  formData.append('star', String(newContent.star));
  formData.append('categoryName', newContent.categoryName);
  formData.append('storeName', newContent.storeName);
  formData.append('address', newContent.address);
  formData.append('latitude', newContent.latitude);
  formData.append('longitude', newContent.longitude);

  newContent.imgUrl?.forEach((file, index) => {
    formData.append('imgUrl', file);
  });

  const response = await authApi.post('/posts', formData);
  return response.data;
};

const usePostContentMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
  return {
    postContentMutate: mutation.mutate,
    isPostContentLoading: mutation.isLoading,
    isPostContentSuccess: mutation.isSuccess,
    isPostContentError: mutation.isLoading,
  };
};

export default usePostContentMutate;
