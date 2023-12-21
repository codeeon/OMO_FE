import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { BookmarkLocationType } from '../../../../model/interface';
import { BookMarkerIcon } from '../../../../assets/icons/BookMarker';
import styled from 'styled-components';

interface Props {
  place: BookmarkLocationType;
}

const BookMarker: React.FC<Props> = ({ place }) => {
  const { Location } = place;
  return (
    <CustomOverlayMap
      position={{
        lat: Number(Location.latitude),
        lng: Number(Location.longitude),
      }}
      yAnchor={-2}
      xAnchor={-1}
    >
      <BtnWrapper>
        <BookMarkerIcon />
      </BtnWrapper>
    </CustomOverlayMap>
  );
};

export default BookMarker;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 100%;

  background: ${({ theme }) => theme.color.primary};
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
