import { useInfiniteQuery, useQuery } from 'react-query';

import authApi from '../../../axios/authApi';
import { CommentTypeNew } from '../../../model/interface';

const getComments = async (
  postId: number,
  lastSeenId: number | undefined, // 마지막 게시글 id
  page: number | undefined, // 불러올 게시글 숫자
): Promise<CommentTypeNew[]> => {
  const params = {
    lastSeenId: lastSeenId,
    page: page,
  };

  const response = await authApi.get(`/posts/${postId}/comments`, { params });
  console.log(response);
  return response.data;
};

const useGetCommentQuery = (postId: number) =>
  useInfiniteQuery(
    ['comments', postId],
    ({ pageParam }) => getComments(postId, pageParam, 5),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length > 0) {
          return lastPage.data[lastPage.data.length - 1].commentId;
        } else {
          return null;
        }
      },
    },
  );

export default useGetCommentQuery;
