// import React from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';

// const KakaoLogin2: React.FC = () => {
//   const { data, error, isLoading } = useQuery('kakaoAuth', () =>
//     axios.get(
//       `https://kauth.kakao.com/oauth/authorize?client_id=${
//         import.meta.env.VITE_APP_KAKAO_API_KEY
//       }&redirect_uri=${
//         import.meta.env.VITE_APP_REDIRECT_URI
//       }&response_type=code`,
//     ),
//   );

//   const handleLogin = () => {
//     if (data) {
//       window.location.href = data.data.redirectUri;
//     }
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <button onClick={handleLogin} disabled={error !== undefined}>
//           Kakao 로그인
//         </button>
//       )}
//     </div>
//   );
// };

// export default KakaoLogin2;
