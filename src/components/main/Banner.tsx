import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import BannerPlaceCard from './BannerPlaceCard';
import Location from '../../Location';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Banner: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  return (
    <Base>
      <Wrapper>
        <TitleContainer>
          <BannerTitle>
            <h2>
              오늘은 <span>모하지?</span>
            </h2>
          </BannerTitle>
          <BannerTitle>
            <h2>
              오늘은 <span>요기서!</span>
            </h2>
          </BannerTitle>
          <Location
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
          />
        </TitleContainer>
        <HotPlaceContainer>
          <BannerPlaceCard />
          <BannerPlaceCard />
        </HotPlaceContainer>
      </Wrapper>
    </Base>
  );
};

export default Banner;

const Base = styled.div`
  background: #fff0f0;
  width: 100%;
  height: 390px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 22px;
`;

const BannerTitle = styled.div`
  h2 {
    color: #000;
    font-size: 48px;
    font-weight: 700;
  }
  span {
    color: #f97393;
    font-size: 48px;
    font-weight: 700;
  }
`;

const HotPlaceContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
`;
