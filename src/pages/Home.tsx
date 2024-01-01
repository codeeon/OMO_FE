import React, { useEffect } from 'react';
import styled from 'styled-components';
import RecentContents from './main/RecentContents';
import PlaceComments from './main/comment';
import HotContents from './main/hotContents';
import Banner from './main/banner';
import Footer from '../components/footer/Footer';

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
