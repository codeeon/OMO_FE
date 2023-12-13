import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentType } from '../model/interface';

const getContents = async (): Promise<ContentType[]> => {
  const response = await axios.get('http://localhost:3001/contents');
  return response.data;
};

const useGetAllContentsQuery = () => useQuery('contents', getContents);

export default useGetAllContentsQuery;
