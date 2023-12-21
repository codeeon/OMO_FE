import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import MapLevelButton from './LevelButton.tsx';
import MapCurrentButton from './CurrentButton.tsx';
import {
  BookmarkLocationType,
  LocationType,
  MapCurrentLocationType,
  MapLocationType,
} from '../../../model/interface.ts';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import PlaceMarker from './customInfo/PlaceMarker.tsx';
import CurrentMarker from './customInfo/CurrentMarker.tsx';
import ReSearchButton from './ReSearchButton.tsx';
import BookmarkButton from './BookmarkButton.tsx';
import useGetBookmarkQuery from '../../../hooks/reactQuery/bookmark/useGetBookmarkQuery.tsx';
import BookMarker from './customInfo/BookMarker.tsx';

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
  myLoca: MapCurrentLocationType;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isListOpen: boolean;
  setMyLoca: React.Dispatch<React.SetStateAction<MapCurrentLocationType>>;
  mapRef: React.RefObject<kakao.maps.Map>;
  bookmarkPlaceDb: BookmarkLocationType[];
}

const MapMain: React.FC<Props> = ({
  placeDatas,
  selectedPlace,
  setSelectedPlace,
  mapCenterLocation,
  setMapCenterLocation,
  setIsListOpen,
  isListOpen,
  myLoca,
  setMyLoca,
  mapRef,
  bookmarkPlaceDb,
}) => {
  const [level, setLevel] = useState(2);
  const [isShowBookmarker, setIsShowBookmarker] = useState<boolean>(false);
  const ToggleBookMarker = () => {
    setIsShowBookmarker(!isShowBookmarker);
  };
  return (
    <CustomMap
      center={mapCenterLocation.center}
      level={level}
      ref={mapRef}
      zoomable={true}
      isPanto={mapCenterLocation.isPanto}
      isListOpen={isListOpen}
      isSelectedPlace={selectedPlace !== null}
      onTileLoaded={(map) => {
        const bounds = map.getBounds();

        setMapCenterLocation({
          ...mapCenterLocation,
          bounds: {
            ha: bounds?.ha,
            oa: bounds?.oa,
            pa: bounds?.pa,
            qa: bounds?.qa,
          },
        });
      }}
    >
      <ReSearchButton
        setMyLoca={setMyLoca}
        mapRef={mapRef}
        myLoca={myLoca}
        mapCenterLocation={mapCenterLocation}
        setMapCenterLocation={setMapCenterLocation}
      />
      <BookmarkButton ToggleBookMarker={ToggleBookMarker} />
      <MapCurrentButton
        setMapCenterLocation={setMapCenterLocation}
        mapCenterLocation={mapCenterLocation}
        setMyLoca={setMyLoca}
        mapRef={mapRef}
      />
      <MapLevelButton mapRef={mapRef} setLevel={setLevel} />
      <CurrentMarker
        lat={myLoca.lat}
        lng={myLoca.lng}
        placeName={myLoca.placeName}
      />
      {isShowBookmarker &&
        bookmarkPlaceDb.map((place) => <BookMarker place={place} />)}

      {placeDatas?.map((placeDb) => (
        <PlaceMarker
          placeDb={placeDb}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          setIsListOpen={setIsListOpen}
          isListOpen={isListOpen}
        >
          {placeDb.Category.categoryName === '카페' ? (
            <IoMdCafe />
          ) : placeDb.Category.categoryName === '음식점' ? (
            <IoRestaurant />
          ) : (
            <FaLocationDot />
          )}
        </PlaceMarker>
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
  width: ${({ isListOpen, isSelectedPlace }) =>
    isListOpen && isSelectedPlace ? '80%' : isListOpen ? '90%' : '100%'};
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
