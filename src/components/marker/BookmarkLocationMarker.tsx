import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BookmarkLocationType } from '../../model/interface';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import { BookMarkerIcon } from '../../assets/icons/BookMarker';

interface Props {
  placeDb: BookmarkLocationType;
}

const BookmarkLocationMarker: React.FC<Props> = ({ placeDb }) => {
  const { Location } = placeDb;

  const getPixelPositionOffset = useCallback(
    (width: number, height: number) => ({
      x: -(width / 2) - 8,
      y: -(height / 2) + 5,
    }),
    [],
  );
  return (
    <OverlayViewF
      position={{
        lat: Number(Location.latitude),
        lng: Number(Location.longitude),
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <CustomMarkerContainer>
        <BookMarkerIcon />
      </CustomMarkerContainer>
    </OverlayViewF>
  );
};

export default BookmarkLocationMarker;

const CustomMarkerContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
