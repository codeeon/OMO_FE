// import { useQuery } from 'react-query';
// // import { HotPostsType } from '../../../model/interface';
// import authApi from '..//..//..//axios/authApi';

// const getMyBookmark = async () => {
//   const response = await authApi.get(`/users/self/profile/bookmark`);
//   return response.data;
// };

// const useGetMyBookmarkQuery = () =>
//   useQuery('myBookmark', () => getMyBookmark());

// export default useGetMyBookmarkQuery;

import { useInfiniteQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getMyBookmark = async (
  lastBookmarkId: number | undefined, // 마지막 게시글 id
  pageSize: number | undefined, // 불러올 게시글 숫자
) => {
  const params = {
    lastBookmarkId,
    pageSize,
  };

  const response = await authApi.get('/users/self/profile/bookmark', {
    params,
  });

  return response.data;
};

const useGetMyBookmarkQuery = (
  lastBookmarkId: number | undefined, // 마지막 게시글 id
  pageSize: number | undefined, // 불러올 게시글 숫자
) =>
  useInfiniteQuery(
    'myBookmark',
    ({ pageParam = { lastBookmarkId: null, pageSize: 20 } }) =>
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
