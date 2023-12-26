import { useInfiniteQuery, useQuery } from 'react-query';
import { PostType } from '../../../model/interface';
import { instance } from '../../../apis/apis';

const getContents = async (
  districtName: string | undefined,
  categoryName: string | undefined,
  lastSeenPage: number | undefined, // 마지막 게시글 id
  page: number | undefined, // 불러올 게시글 숫자
): Promise<PostType[]> => {
  const params =
    districtName === '전체' && categoryName === '전체'
      ? {
          districtName: '',
          categoryName: '',
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : districtName === '전체' && categoryName !== '전체'
      ? {
          districtName: '',
          categoryName: categoryName,
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : districtName !== '전체' && categoryName === '전체'
      ? {
          districtName: districtName,
          categoryName: '',
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : {
          districtName: districtName,
          categoryName: categoryName,
          lastSeenPage: lastSeenPage,
          page: page,
        };

  const response = await instance.get('/posts', { params });
  console.log(response.data);
  return response.data;
};

const useGetAllContentsQuery = (
  districtName: string | undefined,
  categoryName: string | undefined,
) =>
  useInfiniteQuery(
    'posts',
    ({ pageParam }) => getContents(districtName, categoryName, pageParam, 20),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].postId
          : undefined;
      },
    },
  );

export default useGetAllContentsQuery;
