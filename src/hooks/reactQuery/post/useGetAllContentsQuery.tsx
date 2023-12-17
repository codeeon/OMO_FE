import { useQuery } from 'react-query';
import { PostType } from '../../../model/interface';
import { instance } from '../../../apis/apis';

const getContents = async (
  districtName: string | undefined,
  categoryName: string | undefined,
): Promise<PostType[]> => {
  const params =
    districtName === '전체' && categoryName === '전체'
      ? null
      : districtName === '전체' && categoryName !== '전체'
      ? { categoryName: categoryName }
      : districtName !== '전체' && categoryName === '전체'
      ? { districtName: districtName }
      : { districtName: districtName, categoryName: categoryName };

  const response = await instance.get('/posts', { params });
  return response.data.posts;
};

const useGetAllContentsQuery = (
  districtName: string | undefined,
  categoryName: string | undefined,
) => useQuery('contents', () => getContents(districtName, categoryName));

export default useGetAllContentsQuery;
