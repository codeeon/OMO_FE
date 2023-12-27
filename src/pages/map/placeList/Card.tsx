import React from 'react';
import { LocationType } from '../../../model/interface';
import styled from 'styled-components';
import { LuBookmark } from 'react-icons/lu';
import { PiStarFill } from 'react-icons/pi';
import { MdLocationOn } from 'react-icons/md';

interface Props {
  placeDb: LocationType;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
}

const Card: React.FC<Props> = ({ placeDb, setSelectedPlace }) => {
  const { Posts, address, storeName, Category, starAvg, postCount } = placeDb;

  const selectPlaceHandler = (place: LocationType) => {
    setSelectedPlace(place);
  };

  return (
    <>
      <Base onClick={() => selectPlaceHandler(placeDb)}>
        <ImageContainer imageURL={Posts[0].imgUrl} />
        <HeaderContainer>
          <PlaceName>{storeName}</PlaceName>
          <CategoryName>{Category.categoryName}</CategoryName>
          <BookMarkBtn>
            <LuBookmark />
          </BookMarkBtn>
        </HeaderContainer>
        <LocationName>
          <MdLocationOn />
          <span>{address}</span>
        </LocationName>
        <FoonterContainer>
          <RatingConatiner>
            <RatingBtnWrapper>
              <PiStarFill />
            </RatingBtnWrapper>
            <Title>별점</Title>
            <Count>{starAvg}</Count>
          </RatingConatiner>
          <ContentCountContainer>
            <Title>게시글</Title>
            <Count>{postCount}</Count>
          </ContentCountContainer>
        </FoonterContainer>
      </Base>
    </>
  );
};

export default Card;

const Base = styled.div`
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
`;

const ImageContainer = styled.div<{ imageURL?: string }>`
  background: gray;
  width: 100%;
  height: 180px;
  border-radius: 8px;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
`;

const CategoryName = styled.div`
  color: ${({ theme }) => theme.color.sub2};
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

  color: #44a5ff;
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
  color: #f97393;
  font-size: 20px;
`;

const ContentCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.sub2};
  font-size: 16px;
  font-weight: 500;
`;

const Count = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
`;
