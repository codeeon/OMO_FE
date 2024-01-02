import React from 'react';
import styled from 'styled-components';
import Location from './location';

const webPImgUrl =
  'https://firebasestorage.googleapis.com/v0/b/photo-zone-b66e9.appspot.com/o/Banner.webp?alt=media&token=b4eaf3e2-da7d-4758-ad21-152d6d770446';
const jpgImgUrl =
  'https://firebasestorage.googleapis.com/v0/b/photo-zone-b66e9.appspot.com/o/Banner.jpg?alt=media&token=f0fb2382-1112-418c-91d8-7c887f9cd485';

const Banner = () => {
  return (
    <Base>
      <BackgroundImg>
        <source
          srcSet={webPImgUrl}
          style={{ width: '100%', height: '572px' }}
        />
        <img
          src={jpgImgUrl}
          alt="남산 배너 이미지"
          style={{ width: '100%', height: '572px' }}
        />
      </BackgroundImg>
      <BackgroundImgBlur />
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

const Base = styled.div`
  box-sizing: border-box;

  width: 100%;
  height: 572px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const BackgroundImg = styled.picture`
  position: absolute;
  width: 100%;
  height: 572px;
  object-fit: cover;
`;

const BackgroundImgBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 572px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
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
