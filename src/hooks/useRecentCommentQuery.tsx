import axios from 'axios';
import { CommentType } from '../model/interface';
import { useQuery } from 'react-query';

const getRecentComment = async (): Promise<CommentType[]> => {
  const response = await axios.get('http://localhost:3001/comments');
  return response.data;
};

const useGetRecentCommentsQuery = () =>
  useQuery('recentComments', getRecentComment);

export default useGetRecentCommentsQuery;
