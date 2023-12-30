import { useQuery } from 'react-query';
import auth from '../../../axios/auth';

const getKakao = async () => {
  const response = await auth.get(`/kakao`);
  // console.log(response);
  return response.data;
};
const useGetKakaoQuery = () => useQuery('kakao', () => getKakao());

export default useGetKakaoQuery;
