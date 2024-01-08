import { useQuery } from 'react-query';
import authApi from '../../../axios/authApi';
import { BookmarkLocationType } from '../../../model/interface';

const getBookmark = async (): Promise<BookmarkLocationType[]> => {
  const response = await authApi.get(`/api/posts/user/bookmark`);
  return response.data;
};

const useGetBookmarkQuery = (currentUser: string | null) =>
  useQuery('bookmarkPlaces', getBookmark, { enabled: !!currentUser });

export default useGetBookmarkQuery;
