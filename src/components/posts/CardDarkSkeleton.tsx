import React, { useEffect } from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CardDarkSkeleton = () => {
  return (
    <Base>
      <SkeletonTheme baseColor="#29282E" highlightColor="#1B1B20">
        <ImgContainer />
        <HeaderContainer>
          <Title>
            <Skeleton width="30px" height="15px" />
          </Title>
          <Date>
            <Skeleton width="40px" height="15px" />
          </Date>
        </HeaderContainer>
        <LocationContainer>
          <Skeleton width="150px" height="15px" />
        </LocationContainer>
        <Text>
          <Skeleton width="280px" height="15px" count={2} />
        </Text>
        <Footer>
          <FooterItem>
            <Skeleton width="30px" height="15px" />
          </FooterItem>
          <FooterItem>
            <Skeleton width="30px" height="15px" />
          </FooterItem>
        </Footer>
      </SkeletonTheme>
    </Base>
  );
};

export default CardDarkSkeleton;
const ImgContainer = styled(Skeleton)`
  width: 285px;
  height: 181px;
  border-radius: 8px;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const HeaderContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.sub};
`;

const LocationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  color: #44a5ff;
  svg {
    font-size: 16px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 15px;
    width: 250px;
  }
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Text = styled.div`
  margin-top: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;
