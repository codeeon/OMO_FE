import { useQuery } from 'react-query';
import instance from '../../../axios/api';
import authApi from '../../../axios/authApi';

const getBookmark = async () => {
  const response = await authApi.get(`/posts/user/bookmark`);
  return response.data;
};

const useGetBookmarkQuery = () => useQuery('bookmarkPlaces', getBookmark);

export default useGetBookmarkQuery;
