import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import LocationIcon from '../../assets/icons/LocationIcon';
import { LocationType } from '../../model/interface';
import useMapStore from '../../store/location/googleMapStore';
import usePlaceStore from '../../store/location/placeStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  placeName: string;
  content: string;
  star: number;
  Location: LocationType;
}

const DetailModalBody: React.FC<Props> = ({
  placeName,
  content,
  star,
  Location,
}) => {
  const { setCurrentLocation } = useMapStore();
  const { setPlace } = usePlaceStore();

  const navigate = useNavigate();

  const moveMapHandler = () => {
    document.body.style.overflow = 'auto';
    setCurrentLocation({
      lat: Number(Location.latitude),
      lng: Number(Location.longitude),
    });
    setPlace({
      locationId: Location.locationId,
      latitude: Location.latitude,
      longitude: Location.longitude,
    });
    navigate('/map');
  };
  return (
    <Base>
      <Title>{placeName}</Title>
      <PlaceInfo onClick={moveMapHandler}>
        <LocationIcon />
        <span>{Location.address}</span>
      </PlaceInfo>
      <StarContainer>
        {Array.from({ length: 5 }, (_, idx) => (
          <StarWrapper key={idx}>
            {idx < star ? <FaStar /> : <FaRegStar />}
          </StarWrapper>
        ))}
        <span>{star}점</span>
      </StarContainer>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
    </Base>
  );
};

export default DetailModalBody;

const Base = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const PlaceInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;

  margin-top: 10px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #2086e4;
    font-size: 20px;
  }
  transition: all 300ms ease;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: -0.16px;
  width: 100%;
  color: ${({ theme }) => theme.color.text};
`;

const StarContainer = styled.div`
  margin-top: 15px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 6px;
    text-align: center;
    color: ${({ theme }) => theme.color.sub2};
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 15px;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
`;
