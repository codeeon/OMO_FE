import React, { RefObject } from 'react';

interface LatLng {
  lat: number;
  lng: number;
}

export interface GeocodeResult {}

// 현좌표 -> 주소 변환
export const getCurrentAddress = (): Promise<GeocodeResult> => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          const coord = new kakao.maps.LatLng(lat, lng);

          const geocodeCallback = (result: GeocodeResult, status: string) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result);
            } else {
              reject(new Error('Geocode request failed'));
            }
          };
          geocoder.coord2Address(
            coord.getLng(),
            coord.getLat(),
            geocodeCallback,
          );
        },
        (err) => {
          reject(err);
        },
        { enableHighAccuracy: true },
      );
    } else {
      reject(new Error('Geolocation is not supported by your browser.'));
    }
  });
};

// 현재 좌표 반환 함수
export const getCurrentLocationCoordinates = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(`위치 정보를 가져오는데 실패했습니다. 오류: ${error.message}`);
        },
      );
    } else {
      reject('브라우저가 Geolocation API를 지원하지 않습니다.');
    }
  });
};

// 좌표 -> 주소 반환
export const coord2Address = (lng: number, lat: number) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const geocodeCallback = (result: GeocodeResult, status: string) => {
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
export const moveMyLocation = (
  setState: React.Dispatch<React.SetStateAction<Location>>,
) => {
  getCurrentLocationCoordinates().then((coord) => {
    setState({
      center: { lat: coord.latitude, lng: coord.longitude },
      isPanto: true,
    });
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

type DistrictCoordinates = {
  lat: number;
  lng: number;
};

export const distToLoc = (dist: string): DistrictCoordinates => {
  const districtCenter: Record<string, DistrictCoordinates> = {
    강남구: { lng: 127.0495556, lat: 37.514575 },
    강동구: { lng: 127.1258639, lat: 37.52736667 },
    강북구: { lng: 127.0277194, lat: 37.63695556 },
    강서구: { lng: 126.851675, lat: 37.54815556 },
    관악구: { lng: 126.9538444, lat: 37.47538611 },
    광진구: { lng: 127.0845333, lat: 37.53573889 },
    구로구: { lng: 127.0495556, lat: 37.514575 },
    금천구: { lng: 127.0495556, lat: 37.514575 },
    노원구: { lng: 127.0495556, lat: 37.514575 },
    도봉구: { lng: 127.0495556, lat: 37.514575 },
    동대문구: { lng: 127.0495556, lat: 37.514575 },
    동작구: { lng: 127.0495556, lat: 37.514575 },
    마포구: { lng: 127.0495556, lat: 37.514575 },
    서대문구: { lng: 127.0495556, lat: 37.514575 },
    서초구: { lng: 127.0495556, lat: 37.514575 },
    성동구: { lng: 127.0495556, lat: 37.514575 },
    성북구: { lng: 127.0495556, lat: 37.514575 },
    송파구: { lng: 127.0495556, lat: 37.514575 },
    양천구: { lng: 127.0495556, lat: 37.514575 },
    영등포구: { lng: 127.0495556, lat: 37.514575 },
    용산구: { lng: 127.0495556, lat: 37.514575 },
    은평구: { lng: 127.0495556, lat: 37.514575 },
    종로구: { lng: 127.0495556, lat: 37.514575 },
    중구: { lng: 127.0495556, lat: 37.514575 },
    중랑구: { lng: 127.0495556, lat: 37.514575 },
  };
  return districtCenter[dist];
};
