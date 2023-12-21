import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { RecentPostsType } from '../../../model/interface';
import axios from 'axios';

// categoryName,

export const getRecentPosts = async (
  districtName: string | undefined,
  categoryName: string,
): Promise<RecentPostsType[]> => {
  const params = {
    districtName: districtName !== '전체' ? districtName : '',
    categoryName: categoryName !== '전체' ? categoryName : '',
    limit: 12,
  };
  const response = await instance.get(`/main/recent`, { params });
  return response.data;
};

const useGetRecentPostsQuery = (
  districtName: string | undefined,
  categoryName: string,
) => useQuery('recentPosts', () => getRecentPosts(districtName, categoryName));

export default useGetRecentPostsQuery;
