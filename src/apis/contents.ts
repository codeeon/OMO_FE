import axios from 'axios';

export const getContentsTest = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/contents`,
  );
  return res.data;
};

// export const getHotContents = async (address_name, limit = 24) => {
//   const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/posts/${address_name}`, {
//     params: { limit },
//   }); // 용산구 -> ${PLACE.address_name.split('')[1]}
//   return res.data;
// };
// export const getHotContentsLocations = async ([postId, locationId]) => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_APP_SERVER_URL}/posts/${postId}/${locationId}`,
//   ); // ${PLACE.address_name.split('')[1]}
//   return res.data;
// };
// export const getHotContentsCategories = async ([postId, categoryId]) => {
//   const res = await axios.get(
//     `${VITE_APP_SERVER_URL}/posts/${postId}/${categoryId}`,
//   );
// };

// export const getRecentContents = async () => {
//   const res = await axios.get(`${VITE_APP_SERVER_URL}/posts/용산구`); // ${PLACE.address_name.split('')[1]}
//   return res.data;
// };

// export const getRecentComments = async () => {
//   const res = await axios.get(`${VITE_APP_SERVER_URL}/comments`); // ${PLACE.address_name.split('')[1]}
//   return res.data;
// };
