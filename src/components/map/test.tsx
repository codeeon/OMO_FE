import React from 'react';

const test = () => {
  return <div></div>;
};

export default test;

// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Map } from 'react-kakao-maps-sdk';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const Home = () => {
//   const [myLoca, setMyLoca] = useState({ lat: 36.5, lng: 127.8 }); // 현재위치 객체 값 설정
//   const [value, setValue] = useState('');

//   const geocoder = new kakao.maps.services.Geocoder();
//   const coord = new kakao.maps.LatLng(myLoca.lat, myLoca.lng);
//   const ps = new kakao.maps.services.Places();
//   const onClichHandler = () => {
//     ps.keywordSearch(value, placesSearchCB);
//   };
//   function placesSearchCB(data: any, status: any, pagination: any) {
//     if (status === kakao.maps.services.Status.OK) {
//       // 정상적으로 검색이 완료됐으면
//       // 검색 목록과 마커를 표출합니다
//       console.log(data);
//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//       alert('검색 결과가 존재하지 않습니다.');
//       return;
//     } else if (status === kakao.maps.services.Status.ERROR) {
//       alert('검색 결과 중 오류가 발생했습니다.');
//       return;
//     }
//   }

//   useEffect(() => {
//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치를 얻어온다
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setMyLoca({
//             lat: position.coords.latitude, // 위도
//             lng: position.coords.longitude, // 경도
//           });

//           const callback = (result: any, status: any) => {
//             if (status === kakao.maps.services.Status.OK) {
//               console.log(result);
//             }
//           };
//           geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
//         },
//         (err) => {
//           alert('현재 위치를 표시할 수 없어요');
//           console.log(err);
//         },
//         { enableHighAccuracy: true }, // 위치정보의 정확도를 높이는 옵션
//       );
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을때
//       alert('현재 위치를 표시할 수 없어요');
//     }
//   }, []);

//   return (
//     <>
//       <CustomMap center={myLoca} level={2} />
//       <input value={value} onChange={(e) => setValue(e.target.value)} />
//       <button onClick={onClichHandler}>검색</button>
//     </>
//   );
// };

// export default Home;

// const CustomMap = styled(Map)`
//   width: 1000px;
//   height: 1000px;
//   border-radius: 50px;
// `;

// // https://joshua1988.github.io/ts/config/types.html#types-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%9E%80
