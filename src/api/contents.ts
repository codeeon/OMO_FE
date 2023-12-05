// contents, comments, recommended, categories

import axios from 'axios';

// export const getHotContents = async () => {
//   const response = await axios.get(
//     `https://omomockapi-52cdb4a60384.herokuapp.com/contents`,
//     // {
//     //   withCredentials: true,
//     // },
//   );
//   console.log(response, response.data);
//   return response.data;
// };

export const getContent = async () => {
  const response = await axios.get(
    `https://ommmoapi-5557a8752856.herokuapp.com/contents`,
    {
      withCredentials: true,
    },
  );
  console.log(response, response.data);
  return response.data;
};

// export const getHotContents = async (depth_2, limit = 24) => {
//   const res = await axios.get(`${VITE_APP_SERVER_URL}/posts/${depth_2}`, {
//     params: { limit },
//   }); // 용산구 -> ${PLACE.address_name.split('')[1] || depth_2}
//   return res.data;
// };
// export const getHotContentsLocations = async ([postId, locationId]) => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_APP_SERVER_URL}/posts/${postId}/${locationId}`,
//   ); // ${PLACE.address.split('')[1] || depth_2}
//   return res.data;
// };
// export const getHotContentsCategories = async ([postId, categoryId]) => {
//   const res = await axios.get(
//     `${VITE_APP_SERVER_URL}/posts/${postId}/${categoryId}`,
//   );
// };

// // export const getRecentContents = async () => {
// //   const res = await axios.get(`${VITE_APP_SERVER_URL}/posts/용산구`); // ${PLACE.address.split('')[1] || depth_2}
// //   return res.data;
// // };

// export const getRecentComments = async () => {
//   const res = await axios.get(`${VITE_APP_SERVER_URL}/comments`); // ${PLACE.address.split('')[1] || depth_2}
//   return res.data;
// };
