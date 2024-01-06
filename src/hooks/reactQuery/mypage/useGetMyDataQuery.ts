import { useQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getMyData = async () => {
  const response = await authApi.get(`/api/users/self/profile`);

  return response.data;
};

const useGetMyDataQuery = () => useQuery('myData', () => getMyData());

export default useGetMyDataQuery;
