import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import Location from './location';

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
            <h3>일상의 새로운 발견!</h3>
          </BannerTitle>
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
      </Wrapper>
    </Base>
  );
};

export default Banner;

const Base = styled.div`
  background-image: url('https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 572px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BannerTitle = styled.div`
  h2 {
    color: #fff;
    font-size: 64px;
    font-weight: 700;
  }
  h3 {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
  }
  span {
    background: linear-gradient(180deg, #f9aec0 0%, #f97393 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 64px;
    font-weight: 700;
  }
  &:nth-child(2) {
    margin-top: 20px;
  }
  &:nth-child(3) {
    margin: 20px 0 44px 0;
  }
`;
