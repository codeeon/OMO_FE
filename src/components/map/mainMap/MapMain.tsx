import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MapLevelButton from './MapLevelButton.tsx';
import MapCurrentButton from './MapCurrentButton.tsx';
import { getCurrentLocationCoordinates } from '../../../function/kakao.ts';
import { FaLocationDot } from 'react-icons/fa6';
import { ContentType } from '../../../model/interface.ts';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  contentsData: ContentType[];
  selectedCategory: string;
}

const MapMain: React.FC<Props> = ({ contentsData, selectedCategory }) => {
  const [myLoca, setMyLoca] = useState({
    // 위치 지정
    center: { lat: 36.5, lng: 127.8 },
    isPanto: false,
  });
  const mapRef = useRef<kakao.maps.Map>(null); // 맵
  const [level, setLevel] = useState(2); // 맵 확대 크기

  useEffect(() => {
    // 초기 렌더링 시 자기위치로 맵 센터 지정.
    getCurrentLocationCoordinates().then((coordinates) => {
      setMyLoca({
        ...myLoca,
        center: { lat: coordinates.latitude, lng: coordinates.longitude },
      });
    });
  }, []);

  const markerImageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };

  const coffeeOrigin = { x: 10, y: 0 };
  const storeOrigin = { x: 10, y: 36 };

  return (
    <CustomMap
      center={myLoca.center}
      level={level}
      ref={mapRef}
      zoomable={true}
      isPanto={myLoca.isPanto}
    >
      <MapCurrentButton setMyLoca={setMyLoca} />
      <MapLevelButton mapRef={mapRef} setLevel={setLevel} />
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: myLoca.center.lat,
          lng: myLoca.center.lng,
        }}
      />
      {selectedCategory === '카페'
        ? contentsData
            .filter((content) => content.categoryName === '카페')
            .map((content) => (
              <MapMarker
                position={{ lat: content.latitude, lng: content.longitude }}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: storeOrigin,
                  },
                }}
              />
            ))
        : selectedCategory === '음식점'
        ? contentsData
            .filter((content) => content.categoryName === '음식점')
            .map((content) => (
              <MapMarker
                position={{ lat: content.latitude, lng: content.longitude }}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: storeOrigin,
                  },
                }}
              />
            ))
        : selectedCategory === '기타'
        ? contentsData
            .filter((content) => content.categoryName === '기타')
            .map((content) => (
              <MapMarker
                position={{ lat: content.latitude, lng: content.longitude }}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: storeOrigin,
                  },
                }}
              />
            ))
        : contentsData.map((content) => (
            <MapMarker
              position={{ lat: content.latitude, lng: content.longitude }}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: storeOrigin,
                },
              }}
            />
          ))}
    </CustomMap>
  );
};

export default MapMain;

const CustomMap = styled(Map)`
  width: 100%;
  height: 100vh;

  position: relative;
`;

const CustomMarker = styled(MapMarker)``;
