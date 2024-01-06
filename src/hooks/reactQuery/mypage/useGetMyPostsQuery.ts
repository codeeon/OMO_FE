import { useInfiniteQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getMyPosts = async (
  lastPostId: number | undefined,
  pageSize: number | undefined, // 불러올 게시글 숫자
) => {
  const params = {
    lastPostId,
    pageSize,
  };

  const response = await authApi.get('/api/users/self/profile/posts', {
    params,
  });

  return response.data;
};

const useGetMyPostsQuery = (
  lastPostId: number | undefined,
  pageSize: number | undefined, // 불러올 게시글 숫자
) =>
  useInfiniteQuery(
    'myPosts',
    ({ pageParam = { lastPostId, pageSize: 20 } }) =>
      getMyPosts(pageParam.lastPostId, pageParam.pageSize),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].postId
          : undefined;
      },
    },
  );

export default useGetMyPostsQuery;
