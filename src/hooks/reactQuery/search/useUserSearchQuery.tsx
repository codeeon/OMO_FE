import { QueryClient, useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { UserSearchType } from '../../../model/interface';

const queryClient = new QueryClient();

const searchUser = async (searchValue: string): Promise<UserSearchType[]> => {
  const params = { nickname: searchValue };
  const response = await instance.get(`/posts/main/searching`, { params });
  return response.data;
};

const useUserSearchQuery = (
  searchValue: string,
  type: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) =>
  useQuery(['userResults', searchValue], () => searchUser(searchValue), {
    onSuccess: () => {
      queryClient.invalidateQueries('userResults');
      setIsLoading(false);
    },
    onError: (err: any) => {
      setIsLoading(false);
      return err;
    },
    enabled: searchValue !== '' && type === '닉네임',
    retry: 1,
  });

export default useUserSearchQuery;
