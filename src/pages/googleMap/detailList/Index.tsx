import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SelectedPlaceType } from '../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import ContentsSection from './ContentsSection';
import useGetLocationPostsQuery from '../../../hooks/reactQuery/map/useGetLocationPostsQuery';
import BookMarkBtn from '../../../components/share/BookMarkBtn';
import { detailSearchFields } from '../../../function/googleSearch.ts/detailSearch';
import useMapStore from '../../../store/location/googleMapStore';
import ClockIcon from '../../../assets/icons/ClockIcon';
import DividingPointIcon from '../../../assets/icons/DividingPointIcon';
import DownArrow from '../../../assets/icons/DownArrow';
import PhoneIcon from '../../../assets/icons/PhoneIcon';

interface Props {
  selectedPlace: SelectedPlaceType | null;
}

const DetailList: React.FC<Props> = ({ selectedPlace }) => {
  const { locationId, latitude, longitude } = selectedPlace || {};
  const { map } = useMapStore();
  const [googleSearchResult, setGoogleSearchResult] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const detailToggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const { data: posts, refetch } = useGetLocationPostsQuery(
    locationId,
    latitude,
    longitude,
  );

  useEffect(() => {
    refetch();
  }, [selectedPlace]);

  useEffect(() => {
    if (!posts) return;
    if (!posts.location.placeInfoId) return setGoogleSearchResult(null);
    const request = {
      placeId: posts?.location.placeInfoId,
      fields: detailSearchFields,
    };
    // @ts-ignore
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    function callback(
      place: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus,
    ) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setGoogleSearchResult(place);
      } else {
        setGoogleSearchResult(null);
      }
    }
  }, [posts]);

  return (
    <Base>
      <BodyContainer>
        <ImageHeader
          imageURL={
            googleSearchResult?.photos?.[0]?.getUrl()
              ? googleSearchResult?.photos?.[0]?.getUrl()
              : posts?.location.Posts[0].imgUrl
          }
        />
        <PlaceName>{posts?.location.storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {posts?.location.address}
        </Address>

        <InfoContainer onClick={detailToggleHandler}>
          <ClockIcon />
          <span>
            {googleSearchResult?.opening_hours?.isOpen ? '영업중' : '영업종료'}
          </span>
          <DividingPointIcon />
          <span>영업시간</span>
          <DownArrow />
        </InfoContainer>
        {isOpen && googleSearchResult ? (
          <WeekDayContainer>
            {googleSearchResult?.opening_hours?.weekday_text?.map((dayText) => (
              <BusinessContainer>
                <div>{dayText}</div>
              </BusinessContainer>
            ))}
          </WeekDayContainer>
        ) : null}
        <InfoContainer>
          <PhoneIcon />
          <span>
            {googleSearchResult?.formatted_phone_number
              ? googleSearchResult?.formatted_phone_number
              : '전화번호 정보 없음'}
          </span>
        </InfoContainer>
        <BookMarContainer>
          <BookMarkBtn locationId={locationId} top="50px" left="160px" />
        </BookMarContainer>
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

const BookMarContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`;

const InfoContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;
  transition: color 300ms ease;
`;

const WeekDayContainer = styled.div`
  margin-top: 10px;
  margin-left: 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const BusinessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.color.border};
`;
