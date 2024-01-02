import { instance } from '../../../apis/apis';

import { useQuery } from 'react-query';

const fetchLocations = async (
  categoryName: string,
  qa: string,
  pa: string,
  ha: string,
  oa: string,
) => {
  const response = await instance.get(
    `/locations?categoryName=${categoryName}&qa=${qa}&pa=${pa}&ha=${ha}&oa=${oa}`,
  );
  return response.data;
};

const useLocationQuery = (
  categoryName: string,
  qa: string,
  pa: string,
  ha: string,
  oa: string,
) => {
  return useQuery(
    ['locations', categoryName, qa, pa, ha, oa],
    () => fetchLocations(categoryName, qa, pa, ha, oa),
    {
      keepPreviousData: true,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: false,
    },
  );
};

export default useLocationQuery;
