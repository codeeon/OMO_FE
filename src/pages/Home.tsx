import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentContents from '../components/main/RecentContents';
import PlaceComments from '../components/main/PlaceComments';
import HotContents from '../components/main/HotContents';
import { useQuery } from 'react-query';
import { getContent } from '../apis/apis';
import { Contents } from '../model/interface';

const Home = () => {
  const [contents, setContents] = useState<Contents[]>([]);

  // const {data} = useQuery('contents', getContent)
  // console.log(data)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getContent();
  //       console.log(result.data);
  //     } catch (error) {
  //       console.error('Error fetching content:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
