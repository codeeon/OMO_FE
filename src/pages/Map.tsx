import React, { useState } from 'react';
import styled from 'styled-components';
import MapMain from '../components/map/mainMap/MapMain';
import MapNav from '../components/map/VerticalBar/MapNav';
import MapPlaceList from '../components/map/VerticalBar/placeList/MapPlaceList';
import MapContentDetail from '../components/map/VerticalBar/placeDetail/MapPlaceDetail';
import { ContentType } from '../model/interface';
import { getContent } from '../apis/apis';
import { useQuery } from 'react-query';

const Map: React.FC = () => {
  const [contentsData, setContentsData] = useState<ContentType[]>([]);
  const [isDetailShow, setDetailIsShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카페');

  const toggleDetailShow = () => {
    setDetailIsShow(!isDetailShow);
  };

  const { data: contents } = useQuery('contents', getContent, {
    onSuccess: (data) => {
      setContentsData(data);
    },
  });

  return (
    <Base>
      <MapNav />
      <MapPlaceList
        contentsData={contentsData}
        toggleDetailShow={toggleDetailShow}
      />
      <MapContentDetail
        toggleDetailShow={toggleDetailShow}
        isDetailShow={isDetailShow}
      />
      <MapMain contentsData={contentsData} selectedCategory={selectedCategory}/>
    </Base>
  );
};

export default Map;

const Base = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
