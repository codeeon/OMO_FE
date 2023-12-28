import React from 'react';
import styled from 'styled-components';
import Location from './location';

const BANNERIMG =
  'https://firebasestorage.googleapis.com/v0/b/photo-zone-b66e9.appspot.com/o/files%2Fseoul-cityscape-at-twilight-in-south-korea.jpg?alt=media&token=94ed1302-6aaf-42ee-8e54-5b991002fc88';

const Banner = () => {
  return (
    <Base $bannerImg={BANNERIMG}>
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
          <Location />
        </TitleContainer>
      </Wrapper>
    </Base>
  );
};

export default Banner;

const Base = styled.div<{ $bannerImg: string }>`
  box-sizing: border-box;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url(${({ $bannerImg }) => $bannerImg});
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
