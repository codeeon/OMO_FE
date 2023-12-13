import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentType } from '../model/interface';

const getContents = async (storeName: string): Promise<ContentType[]> => {
  const response = await axios.get('http://localhost:3001/contents');
  const db = response.data.filter(
    (data: ContentType) => data.placeName === storeName,
  );
  return db;
};

const useGetContentsQuery = (storeName: string) =>
  useQuery('contents', () => getContents(storeName));

export default useGetContentsQuery;
