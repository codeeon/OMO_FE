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

export interface Location {
  center: {
    lat: number;
    lng: number;
  };
  isPanto: boolean;
}

// 현위치로 지도 이동 함수
export const moveMyLocation = async (
  setState: React.Dispatch<React.SetStateAction<Location>>,
) => {
  const coord = await getCurrentCoords();
  setState({
    center: { lat: coord.latitude, lng: coord.longitude },
    isPanto: true,
  });
};

interface HandleLevelParams {
  type: 'increase' | 'decrease';
  mapRef: RefObject<kakao.maps.Map>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

// 지도 축소, 확대
export const handleLevel = ({
  type,
  mapRef,
  setLevel,
}: HandleLevelParams): void => {
  const map = mapRef.current;
  if (!map) return;
  if (type === 'increase') {
    map.setLevel(map.getLevel() + 1);
    setLevel((prevLevel) => prevLevel + 1);
  } else if (type === 'decrease') {
    map.setLevel(map.getLevel() - 1);
    setLevel((prevLevel) => prevLevel - 1);
  }
};
