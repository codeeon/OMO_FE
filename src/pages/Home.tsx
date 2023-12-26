import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/comment';
import HotContents from '../components/main/hotContents';
import Banner from '../components/main/banner';
import Footer from '../components/share/Footer';
import { CurrentLocationType, LocationType } from '../model/interface';
interface Props {
  themeMode: string | null;
  setSelectedPlace: React.Dispatch<SetStateAction<LocationType | null>>;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
  currentDistrict: string | undefined;
  setCurrentDistrict: React.Dispatch<SetStateAction<string | undefined>>;
}

const Home: React.FC<Props> = ({
  themeMode,
  setSelectedPlace,
  setCurrentLocation,
  currentDistrict,
  setCurrentDistrict,
}) => {
  return (
    <Base>
      <Banner
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
      />
      <HotContents
        themeMode={themeMode}
        setSelectedPlace={setSelectedPlace}
        setCurrentLocation={setCurrentLocation}
        currentDistrict={currentDistrict}
        setCurrentDistrict={setCurrentDistrict}
      />
      <RecentContents currentDistrict={currentDistrict} themeMode={themeMode} />
      <PlaceComments currentDistrict={currentDistrict} themeMode={themeMode} />
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
