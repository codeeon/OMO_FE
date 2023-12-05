import axios from 'axios';
import { Contents } from '../model/interface';

export const postContent = async (newContent: Contents) => {
  await axios.post(
    'https://omomockapi-52cdb4a60384.herokuapp.com/contents',
    newContent,
  );
};

export const deleteContent = async (contentId: string) => {
  axios.delete(
    `https://omomockapi-52cdb4a60384.herokuapp.com/contents/${contentId}`,
  );
};

export const patchContent = async (contentId: string, newContent: Contents) => {
  axios.patch(
    `https://omomockapi-52cdb4a60384.herokuapp.com/contents/${contentId}`,
    newContent,
  );
};
