import { QueryClient, useQuery } from 'react-query';
import api from '../../../axios/api';
import { HotPostsType } from '../../../model/interface';

const queryClient = new QueryClient();

const getHotPosts = async (
  districtName: string | undefined,
): Promise<HotPostsType[]> => {
  const params =
    districtName !== '전체'
      ? { districtName, limit: 9 }
      : { districtName: '', limit: 9 };

  const response = await api.get(`/api/main/popular`, { params });
  return response.data;
};

const useGetHotPostsQuery = (districtName: string | undefined) =>
  useQuery('hotPosts', () => getHotPosts(districtName), {
    onSuccess: () => {
      queryClient.invalidateQueries('hotPosts');
    },
    enabled: false,
  });

export default useGetHotPostsQuery;
