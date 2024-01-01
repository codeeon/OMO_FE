import React, { useCallback } from 'react';
import styled from 'styled-components';
import { LocationType } from '../../model/interface';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import usePlaceStore from '../../store/location/placeStore';

interface Props {
  placeDb: LocationType;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationMarker: React.FC<Props> = ({
  placeDb,
  isListOpen,
  setIsListOpen,
}) => {
  const { locationId, latitude, longitude, Category, storeName } = placeDb;
  const { place, setPlace } = usePlaceStore();

  const selectPlaceHandler = useCallback(() => {
    setPlace({
      locationId: locationId,
      latitude: latitude,
      longitude: longitude,
    });
  }, []);

  const getPixelPositionOffset = useCallback(
    (width: number, height: number) => ({
      x: -(width + 80 / 2),
      y: -(height + 110 / 2),
    }),
    [],
  );

  const clikcMarkerHandler = useCallback(() => {
    !isListOpen && setIsListOpen(true);
    selectPlaceHandler();
  }, []);

  return (
    <OverlayViewF
      position={{ lat: latitude, lng: longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <CustomMarkerContainer
        onClick={clikcMarkerHandler}
        $isSelected={place?.locationId === locationId}
        whileTap={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <MarkerIcon $isSelected={place?.locationId === locationId}>
          {placeDb.Category.categoryName === '카페' ? (
            <IoMdCafe />
          ) : placeDb.Category.categoryName === '음식점' ? (
            <IoRestaurant />
          ) : (
            <FaLocationDot />
          )}
        </MarkerIcon>
        <PlaceInfoContainer $isSelected={place?.locationId === locationId}>
          <PlaceName $isSelected={place?.locationId === locationId}>
            {storeName}
          </PlaceName>
          <CategoryName $isSelected={place?.locationId === locationId}>
            {Category.categoryName}
          </CategoryName>
        </PlaceInfoContainer>
      </CustomMarkerContainer>
    </OverlayViewF>
  );
};

export default LocationMarker;

const CustomMarkerContainer = styled(motion.div)<{ $isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: auto;
  height: ${({ $isSelected }) => ($isSelected ? '55px' : '50px')};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? `${theme.color.marker}` : `${theme.color.bg}`};
  border-radius: 25px;
  padding: 13px 8px;

  border: 2px solid ${({ theme }) => theme.color.marker};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: absolute;
  z-index: ${({ $isSelected }) => ($isSelected ? '99' : '1')};

  ::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 6px 6px 0;
    border-color: ${({ $isSelected, theme }) =>
      $isSelected
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

const MarkerIcon = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $isSelected }) => ($isSelected ? '35px' : '30px')};
  height: ${({ $isSelected }) => ($isSelected ? '35px' : '30px')};
  border-radius: 100%;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? '#fff' : `${theme.color.marker}`};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? `${theme.color.marker}` : '#fff'};
  transition: all 300ms ease-in-out;
`;

const PlaceInfoContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: ${({ $isSelected }) => ($isSelected ? '3px' : '1px')};
  width: auto;
  transition: all 300ms ease-in-out;
  margin-right: 8px;
`;

const PlaceName = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected, theme }) =>
    $isSelected ? '#fff' : `${theme.color.text}`};
  font-size: 14px;
  font-weight: 500;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 300ms ease-in-out;
`;

const CategoryName = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? '#c4c4c4' : '#a5a5a5')};
  min-width: 40px;
  font-size: 12px;
  font-weight: 500;
  transition: all 300ms ease-in-out;
`;
