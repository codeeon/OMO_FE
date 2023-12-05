import axios from 'axios';
import { Contents } from '../model/interface';

export const postContent = async (newContent: Contents) => {
  await axios.post(
    'https://omomockapi-52cdb4a60384.herokuapp.com/contents',
    newContent,
  );
};
