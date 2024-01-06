import { useInfiniteQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getMyBookmark = async (
  lastBookmarkId: number | undefined,
  pageSize: number | undefined, // 불러올 게시글 숫자
) => {
  const params = {
    lastBookmarkId,
    pageSize,
  };

  const response = await authApi.get('/api/users/self/profile/bookmark', {
    params,
  });

  return response.data;
};

const useGetMyBookmarkQuery = (
  lastBookmarkId: number | undefined,
  pageSize: number | undefined, // 불러올 게시글 숫자
) =>
  useInfiniteQuery(
    'myBookmark',
    ({ pageParam = { lastBookmarkId, pageSize: 20 } }) =>
      getMyBookmark(pageParam.lastBookmarkId, pageParam.pageSize),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].bookmarkId
          : undefined;
      },
    },
  );

export default useGetMyBookmarkQuery;
