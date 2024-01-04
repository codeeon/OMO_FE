import axios from 'axios';
import { LocationType } from '../model/interface';
import { useMutation, useQueryClient } from 'react-query';
import api from '../axios/api';

const postLocation = async (newLocation: LocationType) => {
  const response = await api.post('/api/locations', newLocation);
  return response.data;
};

const usePostLocationMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('locations');
    },
  });

  return {
    postLocMutate: mutation.mutate,
    isPostLocLoading: mutation.isLoading,
  };
};

export default usePostLocationMutate;
