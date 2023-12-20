import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { HotPostsType, MapLocationType } from '../../../model/interface';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: HotPostsType;
  mapCenterLocation: MapLocationType;
  setMapCenterLocation: React.Dispatch<SetStateAction<MapLocationType>>;
}

const Card: React.FC<Props> = ({
  post,
  mapCenterLocation,
  setMapCenterLocation,
}) => {
  const { imgUrl, Location, content, Category: category } = post;
  const navigate = useNavigate();

  const moveMapHandler = () => {
    setMapCenterLocation({
      ...mapCenterLocation,
      center: {
        lat: Location.latitude,
        lng: Location.longitude,
      },
    });
    navigate('/map');
  };

  return (
    <Base>
      <Wrapper>
        <ImageContainer imageURL={imgUrl}></ImageContainer>
        <Title>{Location.storeName}</Title>
        <BodyConatiner>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
          <FooterContainer>
            <Category>#{category.categoryName}</Category>
            <MapBtnContainer onClick={moveMapHandler}>
              <span>지도로 보기</span>
              <HiArrowNarrowRight />
            </MapBtnContainer>
          </FooterContainer>
        </BodyConatiner>
      </Wrapper>
    </Base>
  );
};

export default Card;

const Base = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 16px;
`;

const Wrapper = styled.div`
  width: 343px;
  height: 280px;
  padding: 20px;
`;

const ImageContainer = styled.div<{ imageURL: string[] }>`
  width: 343px;
  height: 155px;
  border-radius: 8px;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  margin: 12px 0 10px 0;
`;

const BodyConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 90px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  height: 50px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Category = styled.div`
  color: #f97393;
  font-size: 14px;
  font-weight: 700;
`;

const MapBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  span {
    color: #44a5ff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    &:hover {
      color: #3765ff;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    color: #44a5ff;
    margin-bottom: 2px;
    &:hover {
      color: #3765ff;
    }
  }
  cursor: pointer;
`;
