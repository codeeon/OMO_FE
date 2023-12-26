import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { LocationType } from '../../../model/interface';

export const getLocations = async (
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
): Promise<LocationType[]> => {
  const params = { categoryName, qa, pa, ha, oa };
  const response = await instance.get(`/locations`, { params });

  return response.data.location || response.data;
};

const useGetLookAroundQuery = (
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
) => useQuery('Locations', () => getLocations(categoryName, oa, ha, pa, qa));

export default useGetLookAroundQuery;
