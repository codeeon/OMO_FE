interface LatLng {
  lat: number;
  lng: number;
}

export interface GeocodeResult {
  // 적절한 타입으로 결과를 정의해주세요
}

// GeolocationUtil.ts
export const getCurrentPosition = (): Promise<GeocodeResult> => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          const coord = new kakao.maps.LatLng(lat, lng);

          const geocodeCallback = (result: GeocodeResult, status: string) => {
            if (status === kakao.maps.services.Status.OK) {
              // Resolve the promise with the result
              resolve(result);
            } else {
              // Reject the promise with an error message
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
          // Reject the promise with an error
          reject(err);
        },
        { enableHighAccuracy: true },
      );
    } else {
      // Reject the promise with an error message
      reject(new Error('Geolocation is not supported by your browser.'));
    }
  });
};

export const getSearchPlacesApi = (searchQuery: string, map: boolean) => {
  return new Promise((resolve, reject) => {
    if (!map) return;
    const searchPlaces = new kakao.maps.services.Places();
    searchPlaces.keywordSearch(searchQuery, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(data);
      }
      if (status === kakao.maps.services.Status.ERROR) {
        reject(new Error('에러 발생 했습니다.'));
      }
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        reject(new Error('검색 결과가 없습니다.'));
      }
    });
  });
};
