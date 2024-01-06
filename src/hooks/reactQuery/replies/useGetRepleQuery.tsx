import { useQuery } from 'react-query';

import api from '../../../axios/api';
import { RepleType } from '../../../model/interface';

interface getRepleProps {
  postId: number | undefined;
  commentId: number | undefined;
}

const getReple = async ({
  postId,
  commentId,
}: getRepleProps): Promise<RepleType[]> => {
  const response = await api.get(
    `/api/posts/${postId}/comments/${commentId}/replies`,
  );

  return response.data.data;
};

const useGetRepleQuery = (
  postId: number | undefined,
  commentId: number | undefined,
) =>
  useQuery(
    ['posts', postId, commentId],
    () => getReple({ postId, commentId }),
    // { enabled: false },
  );

export default useGetRepleQuery;
