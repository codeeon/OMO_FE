import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import MapGoogle from './MapGoogle';
import { CurrentLocationType, LocationType } from '../../model/interface';
import ListBtn from './ListBtn';
import PlaceList from './placeList';
import DetailList from './detailList/Index';
import useLocationQuery from '../../hooks/reactQuery/map/useGetAroundLocation';

interface Props {
  themeMode: string | null;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<SetStateAction<LocationType | null>>;
  currentLocation: CurrentLocationType;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
}

const Map: React.FC<Props> = ({
  themeMode,
  selectedPlace,
  setSelectedPlace,
  currentLocation,
  setCurrentLocation,
}) => {
  const [map, setMap] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isListOpen, setIsListOpen] = useState<boolean>(true);

  const [mapBounds, setMapBounds] = useState<{
    initialLoad: false;
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
  } | null>(null);

  const { data: placeDatas, refetch: lookAroundRefetch } = useLocationQuery(
    selectedCategory,
    mapBounds?.southWest.lat,
    mapBounds?.northEast.lat,
    mapBounds?.southWest.lng,
    mapBounds?.northEast.lng,
  );

  useEffect(() => {
    lookAroundRefetch();
  }, [mapBounds?.initialLoad, selectedCategory]);

  const onClickListBtn = () => {
    if (selectedPlace !== null) {
      setSelectedPlace(null);
    } else {
      setIsListOpen(!isListOpen);
    }
  };

  return (
    <Base isListOpen={isListOpen}>
      <PlaceListContainer isListOpen={isListOpen}>
        <PlaceList
          map={map}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          placeDatas={placeDatas}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          setCurrentLocation={setCurrentLocation}
        />
      </PlaceListContainer>
      <DetailListContainer
        isListOpen={isListOpen}
        isDetailListOpen={selectedPlace !== null}
      >
        <DetailList selectedPlace={selectedPlace} />
      </DetailListContainer>
      <ListBtnContainer
        isListOpen={isListOpen}
        isDetailListOpen={selectedPlace !== null}
      >
        <ListBtn isListOpen={isListOpen} onClickListBtn={onClickListBtn} />
      </ListBtnContainer>
      <MapGoogle
        map={map}
        setMap={setMap}
        themeMode={themeMode}
        mapBounds={mapBounds}
        setMapBounds={setMapBounds}
        placeDatas={placeDatas}
        lookAroundRefetch={lookAroundRefetch}
        selectedPlace={selectedPlace}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        setSelectedPlace={setSelectedPlace}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
    </Base>
  );
};

export default Map;

const Base = styled.div<{ isListOpen: boolean }>`
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
`;

const PlaceListContainer = styled.div<{ isListOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  left: ${({ isListOpen }) => (isListOpen ? '0' : '-420px')};
  width: 420px;
  height: 100%;
  background: ${({ theme }) => theme.color.cardBg};
  z-index: 3;
  transition: left 400ms ease;
  border-right: 1px solid ${({ theme }) => theme.color.border2};
`;

const DetailListContainer = styled.div<{
  isListOpen: boolean;
  isDetailListOpen: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  left: ${({ isListOpen, isDetailListOpen }) =>
    isListOpen && isDetailListOpen
      ? '420px'
      : isListOpen && !isDetailListOpen
      ? '0px'
      : '-420px'};
  width: 420px;
  height: 100%;
  background: ${({ theme }) => theme.color.cardBg};
  z-index: 2;
  transition: left 400ms ease;
  border-right: 1px solid ${({ theme }) => theme.color.border2};
`;

const ListBtnContainer = styled.div<{
  isListOpen: boolean;
  isDetailListOpen: boolean;
}>`
  position: absolute;
  left: ${({ isListOpen, isDetailListOpen }) =>
    isListOpen && isDetailListOpen
      ? '840px'
      : isListOpen && !isDetailListOpen
      ? '420px'
      : '0px'};
  top: 50%;
  transform: translateY(-50%);

  z-index: 2;

  height: 70px;
  width: 30px;

  background: ${({ theme }) => theme.color.cardBg};

  border-radius: 0 10px 10px 0;
  border: 1px solid ${({ theme }) => theme.color.border2};

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.border2};
  }

  transition: left 400ms ease;
`;
