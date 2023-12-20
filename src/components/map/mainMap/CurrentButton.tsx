import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import { getCurrentCoords } from '../../../function/kakao';
import {
  MapCurrentLocationType,
  MapLocationType,
} from '../../../model/interface';

interface Props {
  setMapCenterLocation: React.Dispatch<React.SetStateAction<MapLocationType>>;
  mapCenterLocation: MapLocationType;
  setMyLoca: React.Dispatch<React.SetStateAction<MapCurrentLocationType>>;
  mapRef: React.RefObject<kakao.maps.Map>;
}

const CurrentButton: React.FC<Props> = ({
  setMyLoca,
  setMapCenterLocation,
  mapRef,
}) => {
  const moveMyLocation = async () => {
    const { latitude, longitude } = await getCurrentCoords();
    const bounds = mapRef.current?.getBounds();
    setMyLoca({
      lat: latitude,
      lng: longitude,
      placeName: null,
    });
    setMapCenterLocation({
      isPanto: true,
      center: {
        lat: latitude,
        lng: longitude,
      },
      bounds: bounds,
    });
  };

  return (
    <BtnWrapper onClick={moveMyLocation}>
      <MdMyLocation />
    </BtnWrapper>
  );
};

export default CurrentButton;

const BtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 45px;
  bottom: 130px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b1b1b1;
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;

  width: 40px;
  height: 40px;

  &:hover {
    font-size: 28px;
    background: #d9d9d9;
  }

  cursor: pointer;
`;
