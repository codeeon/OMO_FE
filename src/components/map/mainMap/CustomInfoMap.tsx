import React, { ReactNode } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { LocationType } from '../../../model/interface';

interface Props {
  placeDb: LocationType;
  children: ReactNode;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isListOpen: boolean;
}

const LevelButton: React.FC<Props> = ({
  placeDb,
  children,
  selectedPlace,
  setSelectedPlace,
  setIsListOpen,
  isListOpen,
}) => {
  const selectPlaceHandler = () => {
    setSelectedPlace(placeDb);
  };
  const { latitude, longitude, storeName, categoryName } = placeDb;

  const clikcMarkerHandler = () => {
    !isListOpen && setIsListOpen(true);
    selectPlaceHandler();
  };

  return (
    <CustomOverlayMap
      position={{ lat: latitude, lng: longitude }}
      yAnchor={1.4}
      xAnchor={0.25}
      zIndex={1}
    >
      <CustomMarkerContainer
        onClick={clikcMarkerHandler}
        isSelected={selectedPlace?.storeName === storeName}
      >
        <MarkerIcon isSelected={selectedPlace?.storeName === storeName}>
          {children}
        </MarkerIcon>

        <PlaceInfoContainer isSelected={selectedPlace?.storeName === storeName}>
          <PlaceName isSelected={selectedPlace?.storeName === storeName}>
            {storeName}
          </PlaceName>
          <CategoryName isSelected={selectedPlace?.storeName === storeName}>
            {categoryName}
          </CategoryName>
        </PlaceInfoContainer>
      </CustomMarkerContainer>
    </CustomOverlayMap>
  );
};

export default LevelButton;

const CustomMarkerContainer = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: ${({ isSelected }) => (isSelected ? '160px' : '150px')};
  height: ${({ isSelected }) => (isSelected ? '45px' : '40px')};
  background: ${({ isSelected, theme }) =>
    isSelected ? `${theme.color.marker}` : `${theme.color.bg}`};
  border-radius: 41px;
  padding: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.marker};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 10px 10px 0;
    border-color: ${({ isSelected, theme }) =>
      isSelected
        ? `${theme.color.marker} transparent`
        : `${theme.color.bg} transparent`};
    display: block;
    width: 0;
    z-index: 1;
    bottom: -8px;
    left: 26px;
    transition: all 300ms ease-in-out;
  }

  ::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 8px 8px 0;
    border-color: #4462ff transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -9px;
    left: 28px;
    transition: all 300ms ease-in-out;
  }
  transition: all 300ms ease-in-out;
`;

const MarkerIcon = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isSelected }) => (isSelected ? '35px' : '30px')};
  height: ${({ isSelected }) => (isSelected ? '35px' : '30px')};
  border-radius: 100%;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : `${theme.color.marker}`};
  color: ${({ isSelected, theme }) =>
    isSelected ? `${theme.color.marker}` : '#fff'};
  transition: all 300ms ease-in-out;
`;

const PlaceInfoContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: ${({ isSelected }) => (isSelected ? '3px' : '1px')};
  width: 70px;
  transition: all 300ms ease-in-out;
`;

const PlaceName = styled.div<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : `${theme.color.text}`};
  font-family: Wanted Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 300ms ease-in-out;
`;

const CategoryName = styled.div<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? '#c4c4c4' : '#a5a5a5')};
  font-size: 12px;
  font-weight: 500;
  transition: all 300ms ease-in-out;
`;
