import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { SlLocationPin } from 'react-icons/sl';
import { LuSettings2 } from 'react-icons/lu';
import LocationDropdown from './LocationDropdown';
import {
  GeocodeResult,
  distToLoc,
  getCurrentAddress,
} from '../../function/kakao';
import { useQuery } from 'react-query';
import { BounceLoader } from 'react-spinners';
import { CurrentLocationType } from '../../model/interface';

interface Props {
  currentLocation: CurrentLocationType;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
}

const LocationFilter: React.FC<Props> = ({
  currentLocation,
  setCurrentLocation,
}) => {
  const [fetchData, setFetchData] = useState(false);

  const { data, isLoading, error, refetch } = useQuery<GeocodeResult, Error>(
    'getCurrentAddress',
    getCurrentAddress,
    {
      enabled: fetchData,
      onSuccess: (result) => {
        const distName = result[0].address.region_2depth_name;
        const coord = distToLoc(result[0].address.region_2depth_name);
        setCurrentLocation({ distName: distName, coord: coord });
      },
    },
  );

  const onClickCurLoca = () => {
    setFetchData(true);
  };

  return (
    <Base>
      <CurLocaBtn onClick={onClickCurLoca}>
        <SlLocationPin />
        {isLoading ? (
          <BounceLoader color="#f97393" size={30} />
        ) : currentLocation ? (
          <span>{currentLocation.distName}</span>
        ) : (
          <span>현재 위치</span>
        )}
      </CurLocaBtn>
      <LocationDropdown
        setCurrentLocation={setCurrentLocation}
        setFetchData={setFetchData}
      />
    </Base>
  );
};

export default LocationFilter;

const Base = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const CurLocaBtn = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 10px 16px;
  width: 125px;
  height: 40px;
  border-radius: 41px;
  border: 1px solid #f97393;

  svg {
    color: #f97393;
    font-size: 20px;
  }

  span {
    color: #323232;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  cursor: pointer;

  &:hover {
    background: #e6e6e6;
  }
`;
