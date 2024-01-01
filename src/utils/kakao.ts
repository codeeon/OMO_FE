import React, { RefObject } from 'react';

//현재 위도 경도 가져오는 함수.
export const getCurrentCoords: () => Promise<{
  latitude: number;
  longitude: number;
}> = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error('브라우저에서 현위치를 반환할 수 없습니다.'));
    }
  });
};

// 좌표 -> 주소 반환
export const coord2Address: (
  lng: number,
  lat: number,
) => Promise<
  {
    address: kakao.maps.services.Address;
    road_address: kakao.maps.services.RoadAaddress | null;
  }[]
> = (lng: number, lat: number) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const geocodeCallback = (
      result: {
        address: kakao.maps.services.Address;
        road_address: kakao.maps.services.RoadAaddress | null;
      }[],
      status: kakao.maps.services.Status,
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(new Error('Geocode request failed'));
      }
    };
    geocoder.coord2Address(lng, lat, geocodeCallback);
  });
};
