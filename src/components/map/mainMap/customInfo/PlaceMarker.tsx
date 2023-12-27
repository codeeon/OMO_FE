import React, { ReactNode } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { LocationType } from '../../../../model/interface';

interface Props {
  placeDb: LocationType;
  children: ReactNode;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isListOpen: boolean;
}

const PlaceMarker: React.FC<Props> = ({
  placeDb,
  children,
  setSelectedPlace,
  selectedPlace,
  setIsListOpen,
  isListOpen,
}) => {
  const selectPlaceHandler = () => {
    setSelectedPlace(placeDb);
  };
  const { latitude, longitude, Category, storeName } = placeDb;

  const clikcMarkerHandler = () => {
    !isListOpen && setIsListOpen(true);
    selectPlaceHandler();
  };

  return (
    <CustomOverlayMap
      position={{ lat: Number(latitude), lng: Number(longitude) }}
      yAnchor={1.4}
      xAnchor={0.25}
      zIndex={selectedPlace === placeDb ? 99 : 1}
    >
      <CustomMarkerContainer
        onClick={clikcMarkerHandler}
        isSelected={selectedPlace === placeDb}
      >
        <MarkerIcon isSelected={selectedPlace === placeDb}>
          {children}
        </MarkerIcon>

        <PlaceInfoContainer isSelected={selectedPlace === placeDb}>
          <PlaceName isSelected={selectedPlace === placeDb}>
            {storeName}
          </PlaceName>
          <CategoryName isSelected={selectedPlace === placeDb}>
            {Category.categoryName}
          </CategoryName>
        </PlaceInfoContainer>
      </CustomMarkerContainer>
    </CustomOverlayMap>
  );
};

export default PlaceMarker;

const CustomMarkerContainer = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: auto;
  height: ${({ isSelected }) => (isSelected ? '50px' : '45px')};
  background: ${({ isSelected, theme }) =>
    isSelected ? `${theme.color.marker}` : `${theme.color.bg}`};
  border-radius: 41px;
  padding: 5px;

  border: 0.5px solid ${({ theme }) => theme.color.marker};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: absolute;
  z-index: ${({ isSelected }) => (isSelected ? '99' : '1')};

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
    left: 25.5px;
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
  width: auto;
  transition: all 300ms ease-in-out;
  margin-right: 8px;
`;

const PlaceName = styled.div<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) =>
    isSelected ? '#fff' : `${theme.color.text}`};
  font-size: 14px;
  font-weight: 500;
  width: auto;
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
