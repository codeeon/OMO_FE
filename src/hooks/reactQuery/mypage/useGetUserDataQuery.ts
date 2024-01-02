import { useQuery } from 'react-query';
// import { HotPostsType } from '../../../model/interface';
import authApi from '../../../axios/authApi';

const getUserData = async () => {
  const response = await authApi.get(`/users/self/profile`);

  return response.data;
};

const useGetUserDataQuery = () => useQuery('userData', () => getUserData());

export default useGetUserDataQuery;
