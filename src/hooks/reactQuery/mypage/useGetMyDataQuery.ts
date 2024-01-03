
import { useQuery } from 'react-query';
// import { HotPostsType } from '../../../model/interface';
import authApi from '../../../axios/authApi';

const getMyData = async () => {
  const response = await authApi.get(`/users/self/profile`);
  // console.log(response.data);
  return response.data;
};

const useGetMyDataQuery = () => useQuery('myData', () => getMyData());

export default useGetMyDataQuery;
