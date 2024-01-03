import { useQuery } from 'react-query';
import instance from '../../../axios/apis';
import authApi from '../../../axios/authApi';

const getBookmark = async () => {
  const response = await authApi.get(`/posts/user/bookmark`);
  response.data;
  return response.data;
};

const useGetBookmarkQuery = () =>
  useQuery('bookmarkPlaces', getBookmark, { enabled: false });

export default useGetBookmarkQuery;
