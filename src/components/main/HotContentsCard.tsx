import React from 'react';
import styled from 'styled-components';

const HotContentsCard: React.FC = () => {
  return (
    <Base>
      <HotContentsBox>
        <HotContentsPhoto src="" alt=""></HotContentsPhoto>
        <HotContentsTitle>경리단길</HotContentsTitle>
        <HotContentsBody>
          <HotContentsText>
            요즘에 다들 놀러간다길래
            <br /> 남자친구랑 같이 놀러 가봤는데 재밌었어요!!
          </HotContentsText>
          <HotContentsNavigation>
            <HotContentsCategory>#카페</HotContentsCategory>
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
`;

const HotContentsBox = styled.div`
  width: 343px;
  height: 287px;
  padding: 20px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

const HotContentsPhoto = styled.img`
  width: 343px;
  height: 155px;
  border-radius: 8px;
  background: #d9d9d9;
`;

const HotContentsTitle = styled.div`
  color: #212121;
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
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
  font-family: Wanted Sans;
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
  color: #a9a9a9;
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const HotContentsMap = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const HotContentsMapText = styled.div`
  color: #a9a9a9;
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
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
