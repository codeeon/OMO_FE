import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { RecentPostsType } from '../../../model/interface';
import axios from 'axios';

export const getRecentPosts = async (
  districtName: string | undefined,
): Promise<RecentPostsType[]> => {
  const params =
    districtName !== '전체' ? { districtName, limit: 4 } : { limit: 4 };
  const response = await instance.get(`/main/recent`, { params });

  return response.data;
};

const useGetRecentPostsQuery = (districtName: string | undefined) =>
  useQuery('recentPosts', () => getRecentPosts(districtName));

export default useGetRecentPostsQuery;
