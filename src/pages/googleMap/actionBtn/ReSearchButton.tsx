import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { IoReload } from 'react-icons/io5';
import { LocationType } from '../../../model/interface';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import useMapStore from '../../../store/location/googleMapStore';

interface Props {
  lookAroundRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<LocationType[], unknown>>;
  setIsShowReasearchBtn: React.Dispatch<SetStateAction<boolean>>;
}

const ReSearchButton: React.FC<Props> = ({
  lookAroundRefetch,
  setIsShowReasearchBtn,
}) => {
  const { map, mapBounds, setMapBounds } = useMapStore();
  const reSearchHandler = () => {
    const bounds = map?.getBounds();
    const northEast = bounds?.getNorthEast();
    const southWest = bounds?.getSouthWest();
    const boundsData = {
      ...mapBounds,
      northEast: { lat: northEast?.lat(), lng: northEast?.lng() },
      southWest: { lat: southWest?.lat(), lng: southWest?.lng() },
    };
    setMapBounds(boundsData);
    lookAroundRefetch();
    setIsShowReasearchBtn(false);
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
  top: 20px;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #44a5ff;
  color: #fff;
  padding: 5px 10px;

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
