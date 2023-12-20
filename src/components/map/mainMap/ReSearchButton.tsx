import React from 'react';
import styled from 'styled-components';
import { IoReload } from 'react-icons/io5';
import {
  MapCurrentLocationType,
  MapLocationType,
} from '../../../model/interface';

interface Props {
  myLoca: MapCurrentLocationType;
  setMyLoca: React.Dispatch<React.SetStateAction<MapCurrentLocationType>>;
  mapRef: React.RefObject<kakao.maps.Map>;
  mapCenterLocation: MapLocationType;
  setMapCenterLocation: React.Dispatch<React.SetStateAction<MapLocationType>>;
}

const ReSearchButton: React.FC<Props> = ({ mapRef, setMapCenterLocation }) => {
  const reSearchHandler = () => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBounds();
    const center = mapRef.current.getCenter();
    const centerLat = center.getLat();
    const centerLng = center.getLng();
    setMapCenterLocation({
      isPanto: true,
      center: {
        lat: centerLat,
        lng: centerLng,
      },
      bounds: bounds,
    });
  };

  return (
    <BtnWrapper onClick={reSearchHandler}>
      <IoReload />
      <span>현 지도에서 검색</span>
    </BtnWrapper>
  );
};

export default ReSearchButton;

const BtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(50%);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #44a5ff;
  color: #fff;

  svg {
    font-size: 22px;
  }

  span {
    font-size: 18px;
    font-weight: 700;
  }
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 41px;

  width: 170px;
  height: 50px;

  cursor: pointer;

  &:hover {
    background: #4462ff;
  }
`;
