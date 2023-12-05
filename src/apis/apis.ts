import axios, { AxiosResponse } from 'axios';
import { Contents } from '../model/interface';

export const postContent = async (newContent: Contents) => {
  return await axios.post(
    'https://omomockapi-52cdb4a60384.herokuapp.com/contents',
    newContent,
  );
};

export const deleteContent = async (contentId: string) => {
  return axios.delete(
    `https://omomockapi-52cdb4a60384.herokuapp.com/contents/${contentId}`,
  );
};

export const patchContent = async (contentId: string, newContent: Contents) => {
  return axios.patch(
    `https://omomockapi-52cdb4a60384.herokuapp.com/contents/${contentId}`,
    newContent,
  );
};

export const getContent = async () => {
  const response = await axios.get(
    `https://omomockapi-52cdb4a60384.herokuapp.com/contents`,
  );
  return response.data;
};
