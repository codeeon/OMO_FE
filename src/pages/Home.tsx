import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/PlaceComments';
import HotContents from '../components/main/HotContents';
import { CommentType, ContentType, CurrentLocationType } from '../model/interface';
import LocationFilter from '../components/share/LocationFilter';

interface Props {
  contents: ContentType[];
  comments: CommentType[];
  currentLocation: CurrentLocationType;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
}

const Home: React.FC<Props> = ({
  contents,
  comments,
  currentLocation,
  setCurrentLocation,
}) => {
  return (
    <Base>
      <LocationFilter
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <HotContents contents={contents} />
      <RecentContents contents={contents} comments={comments} />
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
