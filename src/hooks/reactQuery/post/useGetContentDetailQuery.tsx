import { useQuery } from 'react-query';
import api from '../../../axios/api';
import { PostDetailType } from '../../../model/interface';

const getDetailContent = async (postId: number): Promise<PostDetailType> => {
  const response = await api.get(`/api/posts/${postId}`);
  return response.data;
};

const useGetContentDetailQuery = (postId: number) =>
  useQuery(['posts', postId], () => getDetailContent(postId));

export default useGetContentDetailQuery;
