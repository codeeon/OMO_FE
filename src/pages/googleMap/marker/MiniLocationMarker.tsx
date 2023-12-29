import React from 'react';
import styled from 'styled-components';
import { HotPostsType } from '../../../model/interface';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface Props {
  placeDb: HotPostsType;
}

const MiniLocationMarker: React.FC<Props> = ({ placeDb }) => {
  const { Category, Location } = placeDb;
  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -50,
    y: -10,
  });
  return (
    <OverlayViewF
      position={{ lat: Location.latitude, lng: Location.longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <CustomMarkerContainer
        whileTap={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <MarkerIcon>
          {placeDb.Category.categoryName === '카페' ? (
            <IoMdCafe />
          ) : placeDb.Category.categoryName === '음식점' ? (
            <IoRestaurant />
          ) : (
            <FaLocationDot />
          )}
        </MarkerIcon>
        <PlaceInfoContainer>
          <PlaceName>{Location.storeName}</PlaceName>
          <CategoryName>{Category.categoryName}</CategoryName>
        </PlaceInfoContainer>
      </CustomMarkerContainer>
    </OverlayViewF>
  );
};

export default MiniLocationMarker;

const CustomMarkerContainer = styled(motion.div)`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: auto;
  height: 50px;
  background: ${({ theme }) => theme.color.bg};
  border-radius: 25px;
  padding: 13px 8px;

  border: 2px solid ${({ theme }) => theme.color.marker};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: absolute;

  ::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 6px 6px 0;
    border-color: ${({ theme }) => `${theme.color.bg} transparent`};
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

const MarkerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${({ theme }) => `${theme.color.marker}`};
  color: #fff;
  transition: all 300ms ease-in-out;
`;

const PlaceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1px;
  width: auto;
  transition: all 300ms ease-in-out;
  margin-right: 8px;
`;

const PlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-weight: 500;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 300ms ease-in-out;
`;

const CategoryName = styled.div`
  color: #a5a5a5;
  min-width: 40px;
  font-size: 12px;
  font-weight: 500;
  transition: all 300ms ease-in-out;
`;
