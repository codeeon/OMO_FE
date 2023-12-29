import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostContentType } from '../../../model/interface';

const myImage = async (profileImg: PostContentType) => {
  const myImageFormData = new FormData();

  console.log('PATCH 프로필 이미지 -> ', profileImg);
  
  profileImg.imgUrl?.forEach((file) => {
    myImageFormData.append('imgUrl', file);
  });

  const response = await authApi.patch(
    `/users/self/profile/edit`,
    myImageFormData,
  );
  console.log('PATCH 프로필 폼 데이터 2 -> ', myImageFormData);
  console.log(response);
  return response.data;
};

const useUpdateMyImageMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(myImage, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData');
      console.log();
    },
  });
  return {
    myImageMutate: mutation.mutate,
    isMyImageLoading: mutation.isLoading,
    isMyImageSuccess: mutation.isSuccess,
    isMyImageError: mutation.isLoading,
  };
};

export default useUpdateMyImageMutation;
