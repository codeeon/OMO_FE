import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import MapLevelButton from './LevelButton.tsx';
import MapCurrentButton from './CurrentButton.tsx';
import { getCurrentCoords } from '../../../function/kakao.ts';
import { LocationType, MapLocationType } from '../../../model/interface.ts';
import CustomInfoMap from './CustomInfoMap.tsx';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  selectedCategory: string;
  placeDatas: LocationType[] | undefined;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  mapCenterLocation: MapLocationType;
  setMapCenterLocation: React.Dispatch<React.SetStateAction<MapLocationType>>;
  myLoca: { lat: number; lng: number };
  setMyLoca: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isListOpen: boolean;
}

const MapMain: React.FC<Props> = ({
  selectedCategory,
  placeDatas,
  selectedPlace,
  setSelectedPlace,
  mapCenterLocation,
  setMapCenterLocation,
  setIsListOpen,
  isListOpen,
}) => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const [level, setLevel] = useState(2);
  const [myLoca, setMyLoca] = useState({ lat: 36.5, lng: 127.8 });

  useEffect(() => {
    const setCurLoca = async () => {
      await getCurrentCoords().then((coordinates) => {
        setMyLoca({
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        });
        setMapCenterLocation({
          isPanto: true,
          center: { lat: coordinates.latitude, lng: coordinates.longitude },
        });
      });
    };
    setCurLoca();
  }, []);

  useEffect(() => {
    if (!selectedPlace) return;
    setMapCenterLocation({
      isPanto: true,
      center: { lat: selectedPlace?.latitude, lng: selectedPlace?.longitude },
    });
  }, [selectedPlace]);

  useEffect(() => {
    console.log(mapCenterLocation);
  }, [mapCenterLocation]);

  const cafeDb = placeDatas?.filter((place) => place.categoryName === '카페');
  const RestaurantDb = placeDatas?.filter(
    (place) => place.categoryName === '음식점',
  );
  const etcDb = placeDatas?.filter(
    (place) => place.categoryName !== '카페' && place.categoryName !== '음식점',
  );

  return (
    <CustomMap
      center={mapCenterLocation.center}
      level={level}
      ref={mapRef}
      zoomable={true}
      isPanto={mapCenterLocation.isPanto}
      isListOpen={isListOpen}
      isSelectedPlace={selectedPlace !== null}
    >
      <MapCurrentButton
        setMyLoca={setMapCenterLocation}
        myLoca={mapCenterLocation}
      />
      <MapLevelButton mapRef={mapRef} setLevel={setLevel} />
      <CustomOverlayMap // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: myLoca.lat,
          lng: myLoca.lng,
        }}
      >
        <LocIconWrapper>
          <FaLocationDot />
          <ShadowBox />
        </LocIconWrapper>
      </CustomOverlayMap>
      {selectedCategory === '카페'
        ? cafeDb?.map((placeDb) => (
            <CustomInfoMap
              placeDb={placeDb}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            >
              <IoMdCafe />
            </CustomInfoMap>
          ))
        : selectedCategory === '음식점'
        ? RestaurantDb?.map((placeDb) => (
            <CustomInfoMap
              placeDb={placeDb}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            >
              <IoRestaurant />
            </CustomInfoMap>
          ))
        : selectedCategory === '기타'
        ? etcDb?.map((placeDb) => (
            <CustomInfoMap
              placeDb={placeDb}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            >
              <FaLocationDot />
            </CustomInfoMap>
          ))
        : placeDatas?.map((placeDb) => (
            <CustomInfoMap
              placeDb={placeDb}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            >
              {placeDb.categoryName === '카페' ? (
                <IoMdCafe />
              ) : placeDb.categoryName === '음식점' ? (
                <IoRestaurant />
              ) : (
                <FaLocationDot />
              )}
            </CustomInfoMap>
          ))}
    </CustomMap>
  );
};

export default MapMain;

const CustomMap = styled(Map)<{
  isListOpen: boolean;
  isSelectedPlace: boolean;
}>`
  margin-left: auto;
  width: ${({ isListOpen }) => (isListOpen ? '90%' : '100%')};
  height: calc(100vh - 60px);
  position: relative;
  z-index: 1;
  transition: width 600ms ease;
`;

const LocIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  svg {
    color: #f97393;
    font-size: 36px;
  }
  position: relative;
  z-index: 2;
`;

const ShadowBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  top: 65px;
  width: 12px;
  height: 7px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
`;
