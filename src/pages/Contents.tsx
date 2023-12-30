import React, { useEffect } from 'react';
import Posts from '../components/posts';
import styled from 'styled-components';
import useMapStore from '../store/location/googleMapStore';

const Contents = () => {
  const { initializeMap } = useMapStore();
  useEffect(() => {
    //@ts-ignore
    initializeMap({ lat: 37.514575, lng: 127.0495556 });
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <Base>
      <Posts />
    </Base>
  );
};

export default Contents;

const Base = styled.div``;
