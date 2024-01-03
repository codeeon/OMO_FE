import React, { useEffect } from 'react';
import styled from 'styled-components';
import List from './list/List';
import useMapStore from '../../store/location/googleMapStore';

const Posts = () => {
  const { initializeMap } = useMapStore();

  useEffect(() => {
    //@ts-ignore
    initializeMap({ lat: 37.514575, lng: 127.0495556 });
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <Base>
      <List />
    </Base>
  );
};

export default Posts;

const Base = styled.div``;
