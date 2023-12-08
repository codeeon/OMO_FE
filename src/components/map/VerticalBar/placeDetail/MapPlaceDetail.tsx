import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { LuBookmark } from 'react-icons/lu';
import { PiStarFill } from 'react-icons/pi';
import { PiStarBold } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import MapContentCard from './MapContentCard';

const MapPlaceDetail: React.FC<{
  toggleDetailShow: () => void;
  isDetailShow: boolean;
}> = ({ toggleDetailShow, isDetailShow }) => {
  return (
    <Base isDetailShow={isDetailShow}>
      <Header>
        <BackBtnWrapper onClick={toggleDetailShow}>
          <IoIosArrowBack />
        </BackBtnWrapper>
        <ImageContainer />
        <NameInfoContainer>
          <PlaceName>현대백화점 더현대 서울</PlaceName>
          <CategoryName>활동</CategoryName>
        </NameInfoContainer>
        <LocationName>
          <LocBtnWrapper>
            <FaLocationDot />
          </LocBtnWrapper>
          <span>서울 용산구 이태원동 210-5</span>
        </LocationName>
        <LocationInfoWrapper>
          <LocationInfoBtn>
            <LuBookmark />
            <span>북마크</span>
          </LocationInfoBtn>
          <LocationInfoBtn>
            <PiStarFill />
            <PiStarFill />
            <PiStarFill />
            <PiStarBold />
            <PiStarBold />
            <span>0 별점</span>
          </LocationInfoBtn>
        </LocationInfoWrapper>
      </Header>
      <ContentDetailHeader>
        <ContentDetailTitle>게시글</ContentDetailTitle>
        <ContentDetailTitle>34</ContentDetailTitle>
        <FullContentsBtn>
          <span>전체보기</span>
          <IoIosArrowForward />
        </FullContentsBtn>
      </ContentDetailHeader>
      <MapContentCard />
      <MapContentCard />
      <MapContentCard />
    </Base>
  );
};

export default MapPlaceDetail;

const Base = styled.div<{ isDetailShow: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 420px;
  height: 100vh;

  position: absolute;
  left: ${({ isDetailShow }) => (isDetailShow ? '86px;' : '546px')};

  background-color: #fff;
  z-index: 98;
  border-right: 1px solid #d9d9d9;
  overflow-y: scroll;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 186px !important;
  background: #d9d9d9;
`;

const BackBtnWrapper = styled.div`
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;

  position: sticky;
  top: 0;
  background: #fff;
`;

const NameInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 4px;
  width: 100%;
  padding: 20px;
`;

const PlaceName = styled.div`
  color: #212121;
  font-size: 20px;
  font-weight: 700;
`;

const CategoryName = styled.div`
  color: #5a5a5a;
  font-size: 14px;
  font-weight: 500;
`;

const LocationName = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  span {
    color: #5a5a5a;
    font-size: 16px;
    font-weight: 500;
  }
`;

const LocBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a5a5a5;
  font-size: 16px;
`;

const LocationInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const LocationInfoBtn = styled.div`
  padding: 10px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  svg {
    color: #a5a5a5;
    font-size: 20px;
  }
  span {
    margin-top: 4px;
    color: #323232;
    font-size: 16px;
    font-weight: 700;
  }

  border-radius: 41px;
  border: 1px solid #d9d9d9;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const ContentDetailHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
  width: 90%;
`;

const ContentDetailTitle = styled.div`
  color: #212121;
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 20px */
`;

const FullContentsBtn = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  span {
    color: #a9a9a9;
    font-size: 14px;
    font-weight: 700;
  }

  svg {
    color: #a5a5a5;
  }
`;
