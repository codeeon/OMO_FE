import React from 'react';
import Posts from '../components/posts';
import styled from 'styled-components';

const Contents = () => {
  return (
    <Base>
      <Posts />
    </Base>
  );
};

export default Contents;

const Base = styled.div``;
