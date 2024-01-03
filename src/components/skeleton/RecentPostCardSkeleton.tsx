import React from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useThemeStore from '../../store/theme/themeStore';

const RecentPostCardSkeleton = () => {
  const { themeMode } = useThemeStore();

  return (
    <SkeletonTheme
      baseColor={themeMode === 'DarkMode' ? '#29282E' : undefined}
      highlightColor={themeMode === 'DarkMode' ? '#1B1B20' : undefined}
    >
      <Base>
        <ImgContainer width="285px" height="181px" />
        <HeaderContainer>
          <Title width="40px" height="15px"></Title>
          <VerticalLine />
          <Date width="50px" height="15px"></Date>
        </HeaderContainer>
        <Text></Text>
        <Footer>
          <FooterItem>
            <Skeleton width="30px" height="15px" />
          </FooterItem>
          <FooterItem>
            <Skeleton width="30px" height="15px" />
          </FooterItem>
        </Footer>
      </Base>
    </SkeletonTheme>
  );
};

export default RecentPostCardSkeleton;
const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ImgContainer = styled(Skeleton)`
  width: 285px;
  height: 181px;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const Title = styled(Skeleton)``;

const VerticalLine = styled.div`
  border-right: 1px solid ${({ theme }) => theme.color.cardBorder};
  width: 1px;
  height: 12px;
`;

const Date = styled(Skeleton)``;

const Text = styled(Skeleton)`
  margin-top: 18px;
  height: 20px;
  width: 270px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
