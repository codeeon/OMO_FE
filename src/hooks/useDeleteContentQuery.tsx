import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const deleteContent = async (contentId: number | undefined) => {
  return await axios.delete(`http://localhost:3001/contents/${contentId}`);
};

const useDeleteContentQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
  return {
    deleteMutate: mutation.mutate,
    isDeleteLoading: mutation.isLoading,
  };
};

export default useDeleteContentQuery;
