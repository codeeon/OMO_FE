import React, { useEffect } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/comment';
import HotContents from '../components/main/hotContents';
import Banner from '../components/main/banner';
import Footer from '../components/share/Footer';

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);
  return (
    <Base>
      <Banner />
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
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 60px);
  height: auto;
  background: ${({ theme }) => theme.color.bg};
`;
