import React from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';

const Home = () => {
  return (
    <Base>
      <RecentContents />
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

const RecentContentsWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
`;
