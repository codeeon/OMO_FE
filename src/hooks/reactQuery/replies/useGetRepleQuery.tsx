import { useQuery } from 'react-query';
import apis from '../../../axios/apis';
import { RepleTypeNew } from '../../../model/interface';

interface getRepleProps {
  postId: number | undefined;
  commentId: number | undefined;
}

const getReple = async ({
  postId,
  commentId,
}: getRepleProps): Promise<RepleTypeNew[]> => {
  const response = await apis.get(
    `/posts/${postId}/comments/${commentId}/replies`,
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
