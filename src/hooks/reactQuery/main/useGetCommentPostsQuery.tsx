import { QueryClient, useQuery } from 'react-query';
import api from '../../../axios/api';
import { CommentPostsType } from '../../../model/interface';

const queryClient = new QueryClient();

const getCommentPost = async (
  districtName: string | undefined,
): Promise<CommentPostsType[]> => {
  const params =
    districtName === '전체'
      ? { limit: 9, districtName: '' }
      : { districtName, limit: 9 };

  const response = await api.get(`/api/main/comments`, { params });
  return response.data;
};

const useGetCommentPostsQuery = (districtName: string | undefined) =>
  useQuery('commentPosts', () => getCommentPost(districtName), {
    onSuccess: () => {
      queryClient.invalidateQueries('commentPosts');
    },
  });

export default useGetCommentPostsQuery;
