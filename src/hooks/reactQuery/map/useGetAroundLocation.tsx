import { instance } from '../../../apis/apis';

export const getAroundLocation = async () => {
  const params = {};
  const response = await instance.get('/location', { params });
};

// locationQuery.js

import { useQuery } from 'react-query';

const fetchLocations = async (categoryName, qa, pa, ha, oa) => {
  const response = await instance.get(
    `/locations?categoryName=${categoryName}&qa=${qa}&pa=${pa}&ha=${ha}&oa=${oa}`,
  );
  return response.data;
};

const useLocationQuery = (categoryName, qa, pa, ha, oa) => {
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
