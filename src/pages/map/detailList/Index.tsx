import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LocationType } from '../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import ContentsSection from './ContentsSection';
import useGetLocationPostsQuery from '../../../hooks/reactQuery/map/useGetLocationPostsQuery';

interface Props {
  selectedPlace: LocationType | null;
}

const DetailList: React.FC<Props> = ({ selectedPlace }) => {
  const { locationId, latitude, longitude } = selectedPlace || {}; // Provide default values or an empty object to avoid null-related issues

  const { data: posts, refetch } = useGetLocationPostsQuery(
    locationId,
    latitude,
    longitude,
  );

  useEffect(() => {
    refetch();
  }, [selectedPlace]);

  return (
    <Base>
      <BodyContainer>
        <ImageHeader imageURL={posts?.location.Posts[0].imgUrl} />
        <PlaceName>{posts?.location.storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {posts?.location.address}
        </Address>
        <ContentsSection posts={posts} />
      </BodyContainer>
    </Base>
  );
};

export default DetailList;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.color.cardBg};
  border-right: 1px solid ${({ theme }) => theme.color.border2};
  z-index: 4;
  overflow-y: scroll;
  transition: all 600ms ease;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ImageHeader = styled.div<{ imageURL: string | undefined }>`
  width: 100%;
  height: 186px;
  background: gray;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  color: ${({ theme }) => theme.color.text};
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
    color: ${({ theme }) => theme.color.text};
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
