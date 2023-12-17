import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';

export const getLocations = async (
  latitude: number | null,
  longitude: number,
  categoryName: string,
  ha: number,
  oa: number,
  pa: number,
  qa: number,
) => {
  const params = { latitude, longitude, categoryName, qa, pa, ha, oa };

  const response = await instance.get(`/locations`, { params });
  console.log(response.data);

  return response.data.locations;
};

const useGetLookAroundQuery = (
  latitude: number,
  longitude: number,
  categoryName: string,
  ha: number,
  oa: number,
  pa: number,
  qa: number,
) =>
  useQuery('locations', () =>
    getLocations(latitude, longitude, categoryName, ha, oa, pa, qa),
  );

export default useGetLookAroundQuery;
