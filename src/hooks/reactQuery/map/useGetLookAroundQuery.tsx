import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';

export const getLocations = async (
  latitude: number | null,
  longitude: number | null,
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
) => {
  const params = { latitude, longitude, categoryName, qa, pa, ha, oa };

  const response = await instance.get(`/locations`, { params });

  return response.data.location || response.data;
};

const useGetLookAroundQuery = (
  latitude: number | null,
  longitude: number | null,
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
) =>
  useQuery(
    'locations',
    () => getLocations(latitude, longitude, categoryName, ha, oa, pa, qa),
    {
      enabled: false,
    },
  );

export default useGetLookAroundQuery;
