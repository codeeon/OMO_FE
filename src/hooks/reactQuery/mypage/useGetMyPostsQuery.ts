// import { useQuery } from 'react-query';
// import authApi from '../../../axios/authApi';

// const getMyPosts = async () => {
//   const response = await authApi.get(`/users/self/profile/posts`);
//   return response.data;
// };

// const useGetMyPostsQuery = () => useQuery('myPosts', () => getMyPosts());

// export default useGetMyPostsQuery;

// import { useQuery } from 'react-query';
// // import { HotPostsType } from '../../../model/interface';
// import authApi from '../../../axios/authApi';

// const getMyPosts = async () => {
//   const response = await authApi.get(`/users/self/profile/posts`);
//   return response.data;
// };

// const useGetMyPostsQuery = () => useQuery('myPosts', () => getMyPosts());

// export default useGetMyPostsQuery;

// import { useQuery } from 'react-query';
// // import { HotPostsType } from '../../../model/interface';
// import authApi from '../../../axios/authApi';

// const getMyPosts = async () => {
//   const response = await authApi.get(`/users/self/profile/posts`);
//   return response.data;
// };

// const useGetMyPostsQuery = () => useQuery('myPosts', () => getMyPosts());

// export default useGetMyPostsQuery;

// import { useQuery } from 'react-query';
// // import { HotPostsType } from '../../../model/interface';
// import authApi from '../../../axios/authApi';

// const getMyPosts = async () => {
//   const response = await authApi.get(`/users/self/profile/posts`);
//   return response.data;
// };

// const useGetMyPostsQuery = () => useQuery('myPosts', () => getMyPosts());

// export default useGetMyPostsQuery;

// import { useQuery } from 'react-query';
// // import { HotPostsType } from '../../../model/interface';
// import authApi from '../../../axios/authApi';

// const getMyPosts = async () => {
//   const response = await authApi.get(`/users/self/profile/posts`);
//   return response.data;
// };

// const useGetMyPostsQuery = () => useQuery('myPosts', () => getMyPosts());

// export default useGetMyPostsQuery;

import { useInfiniteQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getMyPosts = async (
  lastPostId: number | undefined, // 마지막 게시글 id
  pageSize: number | undefined, // 불러올 게시글 숫자
) => {
  const params = {
    lastPostId,
    pageSize,
  };

  const response = await authApi.get('/users/self/profile/posts', { params });

  return response.data;
};

const useGetMyPostsQuery = (
  lastPostId: number | undefined, // 마지막 게시글 id
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
