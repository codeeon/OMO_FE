import { QueryClient, useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { StoreSearchType } from '../../../model/interface';

const queryClient = new QueryClient();

const serachStore = async (searchValue: string): Promise<StoreSearchType[]> => {
  const params = { storeName: searchValue };
  const response = await instance.get(`/posts/main/searching`, { params });
  console.log(response.data);
  return response.data;
};

const useStoreSearchQuery = (
  searchValue: string,
  type: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) =>
  useQuery(['storeResults', searchValue], () => serachStore(searchValue), {
    onSuccess: () => {
      queryClient.invalidateQueries('storeResults');
      setIsLoading(false);
    },
    onError: (err: any) => {
      setIsLoading(false);
      return err;
    },
    enabled: searchValue !== '' && type === '게시물',
    retry: 1,
  });
export default useStoreSearchQuery;
