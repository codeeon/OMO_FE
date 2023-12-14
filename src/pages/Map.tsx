import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapMain from '../components/map/mainMap';
import MapPlaceList from '../components/map/VerticalBar/placeList/MapPlaceList';
import useGetPlaceContentsQuery from '../hooks/useGetPlaceContentsQuery';
import { IoIosArrowForward } from 'react-icons/io';
import { LocationType } from '../model/interface';
import PlaceContentsDetail from '../components/map/VerticalBar/placeDetail/PlaceContentsDetail';

const Map: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
  const [selectedPlace, setSelectedPlace] = useState<LocationType | null>(null);
  const { data: placeDatas, isLoading } = useGetPlaceContentsQuery();
  const [myLoca, setMyLoca] = useState({ lat: 36.5, lng: 127.8 });
  const [mapCenterLocation, setMapCenterLocation] = useState({
    center: { lat: myLoca.lat, lng: myLoca.lng },
    isPanto: false,
  });

  const onClickToggleBtn = () => {
    if (selectedPlace !== null) {
      setSelectedPlace(null);
    } else {
      setIsListOpen(!isListOpen);
    }
  };

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
        />
        <ToggleBtn
          onClick={onClickToggleBtn}
          isDetailListOpen={selectedPlace !== null}
          isListOpen={isListOpen}
        >
          <IconWrapper isListOpen={isListOpen}>
            <IoIosArrowForward />
          </IconWrapper>
        </ToggleBtn>
      </ListWrapper>
      <DetailListWrapper
        isDetailListOpen={selectedPlace !== null}
        isListOpen={isListOpen}
      >
        <PlaceContentsDetail placeDb={selectedPlace} />
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
  transition: all 600ms;
  z-index: 3;
`;

const ToggleBtn = styled.div<{
  isDetailListOpen: boolean;
  isListOpen: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({ isDetailListOpen, isListOpen }) =>
    isDetailListOpen ? '-451px' : isListOpen ? '-31px' : '-31px'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 30px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border};
  z-index: 4;
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
