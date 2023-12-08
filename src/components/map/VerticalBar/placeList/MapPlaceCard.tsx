import React from 'react';
import { ContentType } from '../../../../model/interface';
import styled from 'styled-components';
import { LuBookmark } from 'react-icons/lu';
import { PiStarFill } from 'react-icons/pi';
import { GrLocation } from 'react-icons/gr';

const MapPlaceCard: React.FC<{
  contentDb: ContentType;
  toggleDetailShow: () => void;
}> = ({ contentDb, toggleDetailShow }) => {
  const { imageURL, placeName, categoryName, locationName } = contentDb;
  return (
    <Base onClick={toggleDetailShow}>
      <ImageContainer imageURL={imageURL} />
      <HeaderContainer>
        <PlaceName>{placeName}</PlaceName>
        <CategoryName>{categoryName}</CategoryName>
        <BookMarkBtn>
          <LuBookmark />
        </BookMarkBtn>
      </HeaderContainer>
      <LocationName>
        <GrLocation />
        <span>{locationName}</span>
      </LocationName>
      <FoonterContainer>
        <RatingConatiner>
          <RatingBtnWrapper>
            <PiStarFill />
          </RatingBtnWrapper>
          <Title>별점</Title>
          <Count>3.4</Count>
          <Count>203</Count>
        </RatingConatiner>
        <ContentCountContainer>
          <Title>게시글</Title>
          <Count>34</Count>
        </ContentCountContainer>
      </FoonterContainer>
    </Base>
  );
};

export default MapPlaceCard;

const Base = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
`;

const ImageContainer = styled.div<{ imageURL: string[] }>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
  width: 100%;
  height: 180px;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: start;
  align-items: end;
  gap: 4px;

  width: 100%;
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

const BookMarkBtn = styled.div`
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #a5a5a5;
`;

const LocationName = styled.div`
  margin-top: 10px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: #5a5a5a;
  span {
    font-size: 16px;
    font-weight: 500;
  }
  svg {
    font-size: 22px;
  }
`;

const FoonterContainer = styled.div`
  margin-top: 15px;

  display: flex;
  justify-content: start;
  align-items: center;

  gap: 10px;

  width: 100%;
`;

const RatingConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const RatingBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9d9d9;
  font-size: 20px;
`;

const ContentCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  color: #5a5a5a;
  font-size: 16px;
  font-weight: 500;
`;

const Count = styled.div`
  color: #111;
  font-size: 16px;
  font-weight: 700;
`;
