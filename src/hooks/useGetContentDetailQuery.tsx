import axios from 'axios';
import { useQuery } from 'react-query';
import { PostDetailType } from '../model/interface';

const getDetailContent = async (postId: number): Promise<PostDetailType> => {
  const response = await axios.get(`https://tonadus.shop/api/posts/${postId}`);
  console.log(response.data);
  return response.data;
};

const useGetContentDetailQuery = (postId: number) =>
  useQuery(['contents', postId], () => getDetailContent(postId));

export default useGetContentDetailQuery;
