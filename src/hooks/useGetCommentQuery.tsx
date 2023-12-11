import axios from 'axios';
import { useQuery } from 'react-query';
import { CommentType } from '../model/interface';

const getComments: () => Promise<CommentType[] | []> = async () => {
  const response = await axios.get('http://localhost:3001/comments');
  return response.data;
};

const useGetCommentQuery = () => useQuery('comments', getComments);

export default useGetCommentQuery;
