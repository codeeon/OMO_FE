import axios, { AxiosResponse } from 'axios';
import { Comments, Contents } from '../model/interface';
import { MutationFunction } from 'react-query';

const instance = axios.create({
  baseURL: 'https://ommmoapi-5557a8752856.herokuapp.com',
});

export const postContent = async (newContent: Contents) => {
  return await instance.post(`/contents`, newContent);
};

export const deleteContent = async (contentId: string) => {
  return instance.delete(`/contents/${contentId}`);
};

export const patchContent = async (contentId: string, newContent: Contents) => {
  return instance.patch(`/contents/${contentId}`, newContent);
};

export const getContent = async () => {
  const response = await instance.get(`/contents`);
  return response.data;
};

export const postComment = async (newComment: Comments) => {
  return await instance.post('/comment', newComment);
};

export const deleteComment = async (commentId: string) => {
  return instance.delete(`/comment/${commentId}`);
};

export const patchComment: MutationFunction<
  void,
  { commentId: string; updatedComment: Comments }
> = async ({ commentId, updatedComment }) => {
  try {
    const response = await instance.patch(
      `/comment/${commentId}`,
      updatedComment,
    );
    return response.data; // Assuming your API returns the updated comment
  } catch (error) {
    console.error;
  }
};

export const getComment = async () => {
  const response = await instance.get(`/comment`);
  return response.data;
};
