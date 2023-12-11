import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentType } from '../model/interface';

const getRecentContents = async (): Promise<ContentType[]> => {
  const response = await axios.get('http://localhost:3001/contents');
  return response.data;
};

const useGetRecentContentsQuery = () =>
  useQuery('hotContents', getRecentContents);

export default useGetRecentContentsQuery;
