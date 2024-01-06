import { useQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getBookmark = async () => {
  const response = await authApi.get(`/api/posts/user/bookmark`);
  return response.data.userBookmark;
};

const useGetBookmarkQuery = () =>
  useQuery('bookmarkPlaces', getBookmark, { enabled: false });

export default useGetBookmarkQuery;
