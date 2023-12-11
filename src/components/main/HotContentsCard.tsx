import React from 'react';
import styled from 'styled-components';
import { ContentType } from '../../model/interface';

const HotContentsCard: React.FC<{ contentData: ContentType }> = ({
  contentData,
}) => {
  const { placeName, content, categoryName, imageURL } = contentData;
  return (
    <Base>
      <HotContentsBox>
        <HotContentsPhoto imageURL={imageURL}></HotContentsPhoto>
        <HotContentsTitle>{placeName}</HotContentsTitle>
        <HotContentsBody>
          <HotContentsText>{content}</HotContentsText>
          <HotContentsNavigation>
            <HotContentsCategory>#{categoryName}</HotContentsCategory>
            <HotContentsMap>
              <HotContentsMapText>지도로 보기</HotContentsMapText>
              <HotContentsMapNavigator>{arrow}</HotContentsMapNavigator>
            </HotContentsMap>
          </HotContentsNavigation>
        </HotContentsBody>
      </HotContentsBox>
    </Base>
  );
};

export default HotContentsCard;

const Base = styled.div`
  box-sizing: border-box;

  border: 1px solid #d9d9d9;
  border-radius: 8px;
`;

const HotContentsBox = styled.div`
  width: 343px;
  height: 280px;
  padding: 20px;
`;

const HotContentsPhoto = styled.img<{ imageURL: string[] }>`
  width: 343px;
  height: 155px;
  border-radius: 8px;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const HotContentsTitle = styled.div`
  color: #212121;
  font-size: 20px;
  font-weight: 700;
  margin: 12px 0 10px 0;
`;

const HotContentsBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 90px;
`;

const HotContentsText = styled.div`
  color: #5a5a5a;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

const HotContentsNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HotContentsCategory = styled.div`
  color: #f97393;
  font-size: 14px;
  font-weight: 700;
`;

const HotContentsMap = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const HotContentsMapText = styled.div`
  color: #44a5ff;
  font-size: 14px;
  font-weight: 700;
`;

const HotContentsMapNavigator = styled.div`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M10.8225 4.44751L15.375 9.00001L10.8225 13.5525"
      stroke="#A5A5A5"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.625 9H15.2475"
      stroke="#A5A5A5"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
