import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MapMain from '../components/map/mainMap';
import MapPlaceList from '../components/map/VerticalBar/placeList/MapPlaceList';
import { IoIosArrowForward } from 'react-icons/io';
import {
  LocationType,
  MapCurrentLocationType,
  MapLocationType,
} from '../model/interface';
import PlaceContentsDetail from '../components/map/VerticalBar/placeDetail/PlaceContentsDetail';
import useGetLookAroundQuery from '../hooks/reactQuery/map/useGetLookAroundQuery';
import useGetBookmarkQuery from '../hooks/reactQuery/bookmark/useGetBookmarkQuery';

interface Props {
  myLoca: MapCurrentLocationType;
  setMyLoca: React.Dispatch<SetStateAction<MapCurrentLocationType>>;
  mapCenterLocation: MapLocationType;
  setMapCenterLocation: React.Dispatch<SetStateAction<MapLocationType>>;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<SetStateAction<LocationType | null>>;
}

const Map: React.FC<Props> = ({
  myLoca,
  setMyLoca,
  mapCenterLocation,
  setMapCenterLocation,
  selectedPlace,
  setSelectedPlace,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isListOpen, setIsListOpen] = useState<boolean>(true);  const mapRef = useRef<kakao.maps.Map>(null);

  const {
    data: placeDatas,
    isLoading,
    refetch,
  } = useGetLookAroundQuery(
    mapCenterLocation.center.lat,
    mapCenterLocation.center.lng,
    selectedCategory === '전체' ? '' : selectedCategory,
    mapCenterLocation.bounds?.ha,
    mapCenterLocation.bounds?.oa,
    mapCenterLocation.bounds?.pa,
    mapCenterLocation.bounds?.qa,
  );

  const { data: bookmarkPlaceDb } = useGetBookmarkQuery();
  
  const onClickToggleBtn = () => {
    if (selectedPlace !== null) {
      setSelectedPlace(null);
    } else {
      setIsListOpen(!isListOpen);
    }
  };

  useEffect(() => {
    if (mapCenterLocation.bounds) {
      if (mapCenterLocation.bounds.qa <= 200) {
        refetch();
      }
    }
  }, [myLoca, mapCenterLocation.bounds, selectedCategory]);

  return (
    <Base>
      <ListWrapper isListOpen={isListOpen}>
        <MapPlaceList
          placeDatas={placeDatas}
          isListOpen={isListOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedPlace={setSelectedPlace}
          setMapCenterLocation={setMapCenterLocation}
          setMyLoca={setMyLoca}
          mapRef={mapRef}
          bookmarkPlaceDb={bookmarkPlaceDb}
        />
      </ListWrapper>
      <ToggleBtn
        onClick={onClickToggleBtn}
        isDetailListOpen={selectedPlace !== null}
        isListOpen={isListOpen}
      >
        <IconWrapper isListOpen={isListOpen}>
          <IoIosArrowForward />
        </IconWrapper>
      </ToggleBtn>
      <DetailListWrapper
        isDetailListOpen={selectedPlace !== null}
        isListOpen={isListOpen}
      >
        <PlaceContentsDetail
          placeDb={selectedPlace}
          bookmarkPlaceDb={bookmarkPlaceDb}
        />
      </DetailListWrapper>
      <MapMain
        placeDatas={placeDatas}
        selectedCategory={selectedCategory}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        mapCenterLocation={mapCenterLocation}
        setMapCenterLocation={setMapCenterLocation}
        myLoca={myLoca}
        setMyLoca={setMyLoca}
        setIsListOpen={setIsListOpen}
        isListOpen={isListOpen}
        mapRef={mapRef}
        bookmarkPlaceDb={bookmarkPlaceDb}
      />
    </Base>
  );
};

export default Map;

const Base = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const ListWrapper = styled.div<{ isListOpen: boolean }>`
  position: absolute;
  width: 420px;
  height: calc(100vh - 60px);
  left: ${({ isListOpen }) => (isListOpen ? '0' : '-420px')};
  transition: left 600ms ease;
`;

const DetailListWrapper = styled.div<{
  isDetailListOpen: boolean;
  isListOpen: boolean;
}>`
  position: absolute;
  width: 420px;
  height: calc(100vh - 60px);
  left: ${({ isDetailListOpen, isListOpen }) =>
    isDetailListOpen ? '420px' : '0px'};
  transition: all 600ms ease;
  z-index: 3;
`;

const ToggleBtn = styled.div<{
  isDetailListOpen: boolean;
  isListOpen: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ isDetailListOpen, isListOpen }) =>
    isListOpen && isDetailListOpen ? '840px' : isListOpen ? '420px' : '0px'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 30px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border};
  z-index: 99;
  border-radius: 0 8px 8px 0;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  transition: all 600ms ease;
`;

const IconWrapper = styled.div<{ isListOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ isListOpen }) => (isListOpen ? 'rotate(180deg)' : null)};
  transition: all 200ms ease-in-out;
  color: ${({ theme }) => theme.color.text};
`;
