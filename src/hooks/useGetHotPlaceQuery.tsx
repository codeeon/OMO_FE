import axios from 'axios';
import { LocationType } from '../model/interface';
import { useQuery } from 'react-query';

const getLocation = async (): Promise<LocationType[]> => {
  const response = await axios.get('http://localhost:3001/locations');
  return response.data;
};

const useGetHotPlaceQuery = () => useQuery('locations', getLocation);

export default useGetHotPlaceQuery;
