import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  BookmarkLocationType,
  LocationType,
} from '../../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import BookmarkBtn from './BookmarkBtn';
import ContentsSection from './ContentsSection';
import useGetLocationPostsQuery from '../../../../hooks/reactQuery/map/useGetLocationPostsQuery';

interface Props {
  placeDb: LocationType | null;
  bookmarkPlaceDb: BookmarkLocationType[];
}

const PlaceContentsDetail: React.FC<Props> = ({ placeDb, bookmarkPlaceDb }) => {
  // const { locationId, latitude, longitude } = placeDb || {}; // Provide default values or an empty object to avoid null-related issues

  // const { data: posts, refetch } = useGetLocationPostsQuery(
  //   locationId,
  //   latitude,
  //   longitude,
  // );

  // useEffect(() => {
  //   refetch();
  // }, [placeDb]);

  return (
    <Base>
      <BodyContainer>
        {/* <ImageHeader imageURL={posts?.location.Posts[0].imgUrl} />
        <PlaceName>{posts?.location.storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {posts?.location.address}
        </Address> */}
        {/* <RatingContainer>
          {Array.from({ length: 5 }, (_, idx) => (
            <StarWrapper key={idx}>
              {idx < posts.posts ? <FaStar /> : <FaRegStar />}
            </StarWrapper>
          ))}
          <span>{posts?.location.starAvg}점</span>
        </RatingContainer> */}
        {/* <BookmarkBtn
          locationId={locationId}
          bookmarkPlaceDb={bookmarkPlaceDb}
        /> */}
        {/* <ContentsSection posts={posts} /> */}
      </BodyContainer>
    </Base>
  );
};

export default PlaceContentsDetail;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.color.bg};
  border-right: 1px solid #d9d9d9;
  z-index: 4;
  overflow-y: scroll;
  transition: all 600ms ease;
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
