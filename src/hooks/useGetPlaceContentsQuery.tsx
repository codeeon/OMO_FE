import axios from 'axios';
import { useQuery } from 'react-query';
import { LocationType } from '../model/interface';

const getPlaceContent = async (): Promise<LocationType[]> => {
  const response = await axios.get('http://localhost:3001/locations');
  return response.data;
};

const useGetPlaceContentsQuery = () =>
  useQuery('placeContents', getPlaceContent);

export default useGetPlaceContentsQuery;
