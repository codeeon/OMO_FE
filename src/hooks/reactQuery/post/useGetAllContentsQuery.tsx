import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentType, PostType } from '../../../model/interface';

const getContents = async (): Promise<PostType[]> => {
  const response = await axios.get('https://tonadus.shop/api/posts');
  return response.data.posts;
};

const useGetAllContentsQuery = () => useQuery('contents', getContents);

export default useGetAllContentsQuery;
