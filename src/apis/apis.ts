import axios, { AxiosResponse } from 'axios';
import { CommentType, ContentType } from '../model/interface';
import { MutationFunction } from 'react-query';

const instance = axios.create({
  baseURL: 'https://ommmoapi-5557a8752856.herokuapp.com',
});

export const postContent = async (newContent: ContentType) => {
  return await instance.post(`/contents`, newContent);
};

export const deleteContent = async (contentId: string) => {
  return instance.delete(`/contents/${contentId}`);
};

export const patchContent = async (
  contentId: string,
  newContent: ContentType,
) => {
  return instance.patch(`/contents/${contentId}`, newContent);
};

export const getContent = async () => {
  const response = await instance.get(`/contents`);
  return response.data;
};

export const postComment: MutationFunction<void, CommentType> = async (
  newComment: CommentType,
) => {
  try {
    const response = await instance.post('/comment', newComment);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Optional: Re-throw the error to propagate it further
  }
};

export const deleteComment = async (commentId: string) => {
  return instance.delete(`/comment/${commentId}`);
};

export const patchComment: MutationFunction<
  void,
  { id: string; updatedComment: CommentType }
> = async ({ id, updatedComment }) => {
  try {
    const response = await instance.patch(`/comment/${id}`, updatedComment);
    return response.data; // Assuming your API returns the updated comment
  } catch (error) {
    console.error(error);
  }
};

export const getComment = async () => {
  const response = await instance.get(`/comment`);
  return response.data;
};
