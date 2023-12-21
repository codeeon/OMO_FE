import React, { ReactNode } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { TiLocation } from 'react-icons/ti';

interface Props {
  lat: number | null;
  lng: number | null;
  placeName: string | null;
}

const CurrentMarker: React.FC<Props> = ({ lat, lng, placeName }) => {
  if (lat === null || lng === null) return;
  return (
    <CustomOverlayMap
      position={{ lat: lat, lng: lng }}
      yAnchor={1.4}
      xAnchor={0.25}
      zIndex={1}
    >
      <CustomMarkerContainer>
        <MarkerIcon>
          <TiLocation />
        </MarkerIcon>

        <PlaceInfoContainer>
          <PlaceName>{placeName ? placeName : '현재 위치'}</PlaceName>
        </PlaceInfoContainer>
      </CustomMarkerContainer>
    </CustomOverlayMap>
  );
};

export default CurrentMarker;

const CustomMarkerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  width: auto;
  height: 40px;
  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 41px;
  padding: 5px;
  padding-right: 10px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 10px 10px 0;
    border-color: ${({ theme }) => theme.color.bg} transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -7px;
    left: 26px;
    transition: all 300ms ease-in-out;
  }

  ::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 8px 8px 0;
    border-color: ${({ theme }) => theme.color.primary} transparent;
    display: block;
    width: 0;
    z-index: 0;
    bottom: -8px;
    left: 28px;
    transition: all 300ms ease-in-out;
  }
  transition: all 300ms ease-in-out;
`;

const MarkerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.primary};
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
`;

const PlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 300ms ease-in-out;
`;
