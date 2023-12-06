import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/PlaceComments';
import HotContents from '../components/main/HotContents';
import { CommentType, ContentType } from '../model/interface';

const Home: React.FC<{ contents: ContentType[]; comments: CommentType[] }> = ({
  contents,
  comments,
}) => {
  return (
    <Base>
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


