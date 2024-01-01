import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MapGoogle from './map/MapGoogle';
import ListBtn from './placeList/ListBtn';
import PlaceList from './placeList';
import DetailList from './detailList/Index';
import useLocationQuery from '../../hooks/reactQuery/map/useGetAroundLocation';
import usePlaceStore from '../../store/location/placeStore';
import useMapStore from '../../store/location/googleMapStore';

const Map = () => {
  const { place, setPlace } = usePlaceStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
  const { currentLocation, mapBounds } = useMapStore();

  const { data: placeDatas, refetch: lookAroundRefetch } = useLocationQuery(
    selectedCategory,
    mapBounds?.southWest.lat,
    mapBounds?.northEast.lat,
    mapBounds?.southWest.lng,
    mapBounds?.northEast.lng,
  );

  useEffect(() => {
    if (mapBounds?.northEast.lat === undefined) return;
    lookAroundRefetch();
  }, [mapBounds, selectedCategory, currentLocation, lookAroundRefetch]);

  const onClickListBtn = useCallback(() => {
    if (place !== null) {
      setPlace(null);
    } else {
      setIsListOpen(!isListOpen);
    }
  }, [isListOpen, place, setPlace]);

  return (
    <Base $isListOpen={isListOpen}>
      <PlaceListContainer $isListOpen={isListOpen}>
        <PlaceList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          placeDatas={placeDatas}
        />
      </PlaceListContainer>
      <DetailListContainer
        $isListOpen={isListOpen}
        $isDetailListOpen={place !== null}
      >
        <DetailList selectedPlace={place} />
      </DetailListContainer>
      <ListBtnContainer
        $isListOpen={isListOpen}
        $isDetailListOpen={place !== null}
      >
        <ListBtn isListOpen={isListOpen} onClickListBtn={onClickListBtn} />
      </ListBtnContainer>
      <MapGoogle
        placeDatas={placeDatas}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
      />
    </Base>
  );
};

export default Map;

const Base = styled.div<{ $isListOpen: boolean }>`
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
`;

const PlaceListContainer = styled.div<{ $isListOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  left: ${({ $isListOpen }) => ($isListOpen ? '0' : '-420px')};
  width: 420px;
  height: 100%;
  background: ${({ theme }) => theme.color.cardBg};
  z-index: 3;
  transition: left 300ms ease;
  border-right: 1px solid ${({ theme }) => theme.color.border2};
`;

const DetailListContainer = styled.div<{
  $isListOpen: boolean;
  $isDetailListOpen: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  left: ${({ $isListOpen, $isDetailListOpen }) =>
    $isListOpen && $isDetailListOpen
      ? '420px'
      : $isListOpen && !$isDetailListOpen
      ? '0px'
      : '-420px'};
  width: 420px;
  height: 100%;
  background: ${({ theme }) => theme.color.cardBg};
  z-index: 2;
  transition: left 300ms ease;
  border-right: 1px solid ${({ theme }) => theme.color.border2};
`;

const ListBtnContainer = styled.div<{
  $isListOpen: boolean;
  $isDetailListOpen: boolean;
}>`
  position: absolute;
  left: ${({ $isListOpen, $isDetailListOpen }) =>
    $isListOpen && $isDetailListOpen
      ? '840px'
      : $isListOpen && !$isDetailListOpen
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

  transition: left 300ms ease;
`;
