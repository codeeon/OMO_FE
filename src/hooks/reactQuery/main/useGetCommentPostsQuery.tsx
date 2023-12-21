import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { CommentPostsType, RecentPostsType } from '../../../model/interface';

const getCommentPost = async (
  districtName: string | undefined,
): Promise<CommentPostsType[]> => {
  const params =
    districtName === '전체'
      ? { limit: 9, districtName: '' }
      : { districtName, limit: 9 };

  const response = await instance.get(`/main/comments`, { params });
  console.log(response);
  return response.data;
};

const useGetCommentPostsQuery = (districtName: string | undefined) =>
  useQuery('commentPosts', () => getCommentPost(districtName));

export default useGetCommentPostsQuery;
