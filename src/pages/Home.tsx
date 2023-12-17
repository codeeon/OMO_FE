import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/comment';
import HotContents from '../components/main/hotContents';
import Banner from '../components/main/banner';
import Footer from '../components/share/Footer';
interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
  themeMode: string | null;
}

const Home: React.FC<Props> = ({
  currentLocation,
  setCurrentLocation,
  themeMode,
}) => {
  return (
    <Base>
      <Banner
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <HotContents currentLocation={currentLocation} themeMode={themeMode} />
      <RecentContents currentLocation={currentLocation} themeMode={themeMode} />
      <PlaceComments currentLocation={currentLocation} themeMode={themeMode} />
      <Footer />
    </Base>
  );
};

export default Home;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 60px);
  height: auto;
  background: ${({ theme }) => theme.color.bg};
`;
