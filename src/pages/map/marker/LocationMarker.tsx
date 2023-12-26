import React, { ReactNode } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import {
  CurrentLocationType,
  LocationPostsType,
  LocationType,
} from '../../../model/interface';
import { OverlayView } from '@react-google-maps/api';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface Props {
  placeDb: LocationType;
  selectedPlace: LocationType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLocation: React.Dispatch<React.SetStateAction<CurrentLocationType>>;
}

const LocationMarker: React.FC<Props> = ({
  placeDb,
  setSelectedPlace,
  isListOpen,
  setIsListOpen,
  selectedPlace,
}) => {
  const { latitude, longitude, Category, storeName } = placeDb;

  const selectPlaceHandler = () => {
    setSelectedPlace(placeDb);
  };

  const clikcMarkerHandler = () => {
    !isListOpen && setIsListOpen(true);
    selectPlaceHandler();
  };

  return (
    <OverlayView
      position={{ lat: latitude, lng: longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <CustomMarkerContainer
        onClick={clikcMarkerHandler}
        isSelected={selectedPlace === placeDb}
        whileTap={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <MarkerIcon isSelected={selectedPlace === placeDb}>
          {placeDb.Category.categoryName === '카페' ? (
            <IoMdCafe />
          ) : placeDb.Category.categoryName === '음식점' ? (
            <IoRestaurant />
          ) : (
            <FaLocationDot />
          )}
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
    </OverlayView>
  );
};

export default LocationMarker;

const CustomMarkerContainer = styled(motion.div)<{ isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: auto;
  height: ${({ isSelected }) => (isSelected ? '55px' : '50px')};
  background: ${({ isSelected, theme }) =>
    isSelected ? `${theme.color.marker}` : `${theme.color.bg}`};
  border-radius: 25px;
  padding: 13px 8px;

  border: 2px solid ${({ theme }) => theme.color.marker};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: absolute;
  z-index: ${({ isSelected }) => (isSelected ? '99' : '1')};

  ::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 6px 6px 0;
    border-color: ${({ isSelected, theme }) =>
      isSelected
        ? `${theme.color.marker} transparent`
        : `${theme.color.bg} transparent`};
    display: block;
    width: 0;
    z-index: 1;
    bottom: -5px;
    left: 23px;
    transition: border-color 300ms ease;
  }

  ::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 6px 6px 0;
    border-color: #4462ff transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -7px;
    left: 23.55px;
    transition: border-color 300ms ease;
  }
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
  min-width: 40px;
  font-size: 12px;
  font-weight: 500;
  transition: all 300ms ease-in-out;
`;
