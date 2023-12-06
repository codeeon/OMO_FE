import axios from 'axios';

// 테스트용
export const getContentsTest = async (limit) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/contents`,
    {
      params: { limit },
    },
  );
  return res.data;
};

// 인기게시글 GET 요청,
export const getHotContents = async (address_name, limit = 9) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/posts/${address_name}`,
    {
      params: { limit },
    },
  );
  return res.data;
};

// 최근게시글의 GET 요청 차이에 관해, 이야기 나누기
export const getRecentContents = async (address_name, limit = 16) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/posts/${address_name}`,
    {
      params: { limit },
    },
  );
  return res.data;
};

// 댓글 데이터 - 최근 게시물 4개와, 인기 게시물 9개의 댓글인지? - 그냥 최근 댓글 9개인지? -> 후자로 알고 있긴 함
// 후자라면, 댓글 데이터를 createdAt 순으로 9개 받고, GET comments.postId/address으로 총 두 개의 GET 요청을 이용해야 함
export const getRecentComments = async (address_name, limit = 9) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/comments/${address_name}`,
    {
      params: { limit },
    },
  );
  return res.data;
};
