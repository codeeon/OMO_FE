import axios, { AxiosResponse } from 'axios';
import { Contents } from '../model/interface';

export const postContent = async (newContent: Contents) => {
  return await axios.post(
    'https://ommmoapi-5557a8752856.herokuapp.com/contents',
    newContent,
  );
};

export const deleteContent = async (contentId: string) => {
  return axios.delete(
    `https://ommmoapi-5557a8752856.herokuapp.com/contents/${contentId}`,
  );
};

export const patchContent = async (contentId: string, newContent: Contents) => {
  return axios.patch(
    `https://ommmoapi-5557a8752856.herokuapp.com/contents/${contentId}`,
    newContent,
  );
};
