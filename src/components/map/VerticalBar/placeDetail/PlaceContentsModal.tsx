import React from 'react';
import styled from 'styled-components';
import { LocationType } from '../../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import BookmarkBtn from './BookmarkBtn';
import ContentsSection from './ContentsSection';

interface Props {
  placeDb: LocationType;
}

const PlaceContentsModal: React.FC<Props> = ({ placeDb }) => {
  const { id, categoryName, storeName, address, star } = placeDb;
  return (
    <Base>
      <BodyContainer>
        <ImageHeader />
        <PlaceName>{storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {address}
        </Address>
        <RatingContainer>
          {Array.from({ length: 5 }, (_, idx) => (
            <StarWrapper key={idx}>
              {idx < star ? <FaStar /> : <FaRegStar />}
            </StarWrapper>
          ))}
          <span>{star}점</span>
        </RatingContainer>
        <BookmarkBtn />
        <ContentsSection storeName={storeName} />
      </BodyContainer>
    </Base>
  );
};

export default PlaceContentsModal;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  position: absolute;
  top: 0;
  background-color: #fff;
  z-index: 3;
  border-right: 1px solid #d9d9d9;
  overflow-y: scroll;
`;

const ImageHeader = styled.div`
  width: 100%;
  height: 186px;
  background: gray;
`;
const BodyContainer = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const PlaceName = styled.div`
  color: #212121;
  font-size: 20px;
  font-weight: 700;
  padding: 20px 20px 0 20px;
`;

const Address = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;
`;

const RatingContainer = styled.div`
  margin-top: 10px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 5px;
    text-align: center;
    color: #323232;
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 15px;
  padding: 0 20px;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
`;
