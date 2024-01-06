import { useQuery } from 'react-query';
// import { HotPostsType } from '../../../model/interface';
import authApi from '../../../axios/authApi';

const getUserData = async (nickname: string) => {
  const response = await authApi.get(`/api/users/profile/${nickname}`);
  // console.log('유저 데이터 조회 -> ', response);
  return response.data;
};

const useGetUserDataQuery = (nickname: string) =>
  useQuery('userData', () => getUserData(nickname));

export default useGetUserDataQuery;
