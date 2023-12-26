import { useQuery } from 'react-query';
import { PostDetailType } from '../../../model/interface';
import { instance } from '../../../apis/apis';

const getDetailContent = async (postId: number): Promise<PostDetailType> => {
  const response = await instance.get(`/posts/${postId}`);
  return response.data;
};

const useGetContentDetailQuery = (postId: number) =>
  useQuery(['posts', postId], () => getDetailContent(postId), {
    keepPreviousData: true,
  });

export default useGetContentDetailQuery;
