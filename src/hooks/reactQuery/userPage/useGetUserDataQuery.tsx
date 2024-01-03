import { useQuery } from 'react-query';
// import { HotPostsType } from '../../../model/interface';
import authUsers from '../../../axios/authUsers';

const getUserData = async (nickname: string) => {
  const response = await authUsers.get(`/api/users/profile/${nickname}`);
  console.log('유저 데이터 조회 -> ', response);
  return response.data;
};

const useGetUserDataQuery = (nickname: string) =>
  useQuery('userData', () => getUserData(nickname));

export default useGetUserDataQuery;
