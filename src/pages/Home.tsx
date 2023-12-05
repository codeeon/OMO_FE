import React from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/PlaceComments';
import HotContents from '../components/main/HotContents';
const Home = () => {
  return (
    <Base>
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
