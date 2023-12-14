import axios, { AxiosResponse } from 'axios';
import { CommentType, ContentType } from '../model/interface';
import { MutationFunction } from 'react-query';

export const instance = axios.create({
  // baseURL: 'https://ommmoapi-5557a8752856.herokuapp.com',
  baseURL: 'https://tonadus.shop/api',
});

export const postContent = async (newContent: ContentType) => {
  return await instance.post(`/contents`, newContent);
};

export const deleteContent = async (contentId: number | undefined) => {
  return await instance.delete(`/contents/${contentId}`);
};

export const patchContent = async (
  contentId: number | undefined,
  newContent: ContentType,
) => {
  return instance.patch(`/contents/${contentId}`, newContent);
};

export const getContent = async () => {
  const response = await instance.get('/contents');
  return response.data;
};

export const postComment: MutationFunction<void, CommentType> = async (
  newComment: CommentType,
) => {
  try {
    const response = await instance.post('/comments', newComment);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (commentId: number | undefined) => {
  return instance.delete(`/comments/${commentId}`);
};

export const patchComment: MutationFunction<
  void,
  { id: number | undefined; updatedComment: CommentType }
> = async ({ id, updatedComment }) => {
  try {
    const response = await instance.patch(`/comments/${id}`, updatedComment);
    return response.data; // Assuming your API returns the updated comment
  } catch (error) {
    console.error(error);
  }
};

export const getComment = async () => {
  const response = await instance.get(`/comments`);
  return response.data;
};
