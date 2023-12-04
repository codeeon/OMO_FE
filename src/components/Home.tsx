import React from 'react';
import HotContents from './main/HotContents';
import styled from 'styled-components';

const Home: React.FC = () => {
  return (
    <Base>
      <HotContents />
    </Base>
  );
};

export default Home;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
`;
