import { useInfiniteQuery } from 'react-query';
import authUsers from '../../../axios/authUsers';

const getUserPosts = async (
  nickname: string,
  lastPostId: number | undefined, // 마지막 게시글 id
  pageSize: number | undefined, // 불러올 게시글 숫자
) => {
  const params = {
    nickname,
    lastPostId,
    pageSize,
  };

  const response = await authUsers.get(`/api/users/profile/${nickname}/posts`, {
    params,
  });

  // console.log('유저 게시글 조회 -> ', response);

  return response.data;
};

const useGetUserPostsQuery = (
  nickname,
  lastPostId: number | undefined, // 마지막 게시글 id
  pageSize: number | undefined, // 불러올 게시글 숫자
) =>
  useInfiniteQuery(
    'userPosts',
    ({ pageParam = { lastPostId, pageSize: 20 } }) =>
      getUserPosts(nickname, pageParam.lastPostId, pageParam.pageSize),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].postId
          : undefined;
      },
    },
  );

export default useGetUserPostsQuery;
