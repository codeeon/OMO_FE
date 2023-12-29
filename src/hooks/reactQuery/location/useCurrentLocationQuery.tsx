import { useQuery } from 'react-query';
import { coord2Address, getCurrentCoords } from '../../../function/kakao';

export const getCurrentAddr = async () => {
  try {
    const { latitude, longitude } = await getCurrentCoords();
    const result = await coord2Address(longitude, latitude);
    const district = result[0].address.region_2depth_name;
    return district;
  } catch (error) {
    console.error('현재 주소 에러:', error);
  }
};

const useCurrentLocationQuery = (setState: (dist: string) => void) =>
  useQuery('currentDistrict', getCurrentAddr, {
    enabled: false,
    onSuccess: (result) => {
      if (result) {
        setState(result);
      }
    },
  });

export default useCurrentLocationQuery;
