import React from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useThemeStore from '../../store/theme/themeStore';

const PlaceCardSkeleton = () => {
  const { themeMode } = useThemeStore();

  return (
    <SkeletonTheme
      baseColor={themeMode === 'DarkMode' ? '#29282E' : null}
      highlightColor={themeMode === 'DarkMode' ? '#1B1B20' : null}
    >
      <Base>
        <ImgContainer width="285px" height="168px" />
        <HeaderContainer>
          <Title width="190px" height="20px" />
          <Skeleton width="24px" height="24px" />
        </HeaderContainer>
        <Text />
        <Footer>
          <FooterItem>
            <Skeleton width="180px" height="16px" />
          </FooterItem>
        </Footer>
      </Base>
    </SkeletonTheme>
  );
};

export default PlaceCardSkeleton;
const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ImgContainer = styled(Skeleton)`
  box-sizing: border-box;
  width: 285px;
  height: 168px;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const Title = styled(Skeleton)``;

const Text = styled(Skeleton)`
  margin-top: 18px;
  height: 20px;
  width: 270px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 9px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
