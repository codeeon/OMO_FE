import { useQuery } from 'react-query';
import { coord2Address, getCurrentCoords } from '../../../utils/kakao';
import toast from 'react-hot-toast';

export const getCurrentAddr = async () => {
  const { latitude, longitude } = await getCurrentCoords();
  const result = await coord2Address(longitude, latitude);
  const district = result[0].address.region_2depth_name;
  return district;
};

const useCurrentLocationQuery = (setState: (dist: string) => void) =>
  useQuery('currentDistrict', getCurrentAddr, {
    enabled: false,
    onSuccess: (result) => {
      if (result) {
        setState(result);
      }
      toast.success('현재 위치 업데이트를 완료했습니다.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
    onError: () => {
      toast.success('위치 정보를 불러오지 못했습니다.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    },
  });

export default useCurrentLocationQuery;
