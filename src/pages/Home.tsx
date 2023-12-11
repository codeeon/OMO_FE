import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/PlaceComments';
import HotContents from '../components/main/HotContents';
import { CommentType, ContentType } from '../model/interface';
import Banner from '../components/main/Banner';

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
    </Base>
  );
};

export default Home;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
