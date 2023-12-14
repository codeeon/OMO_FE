import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/comment';
import HotContents from '../components/main/hotContents';
import { CommentType, ContentType } from '../model/interface';
import Banner from '../components/main/banner';
import Footer from '../components/share/Footer';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Home: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  return (
    <Base>
      <Banner
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <HotContents />
      <RecentContents />
      <PlaceComments />
      <Footer />
    </Base>
  );
};

export default Home;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: ${({ theme }) => theme.color.bg};
`;
