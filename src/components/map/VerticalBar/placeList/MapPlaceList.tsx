import React, { useState } from 'react';
import styled from 'styled-components';
import MapSearchInput from './MapSearchInput';
import MapPlaceHeader from './MapPlaceHeader';
import { ContentType } from '../../../../model/interface';
import MapContentCard from './MapPlaceCard';
import MapPlaceDetail from '../placeDetail/MapPlaceDetail';
const categories = ['전체', '음식점', '카페', '기타'];

const MapPlaceList: React.FC<{
  contentsData: ContentType[];
  toggleDetailShow: () => void;
}> = ({ contentsData, toggleDetailShow }) => {
  const [isSelected, setIsSelected] = useState('전체');

  const changeCategory = (category: string) => {
    setIsSelected(category);
  };

  return (
    <Base>
      <MapSearchInput />
      <MapPlaceHeader />
      <PlaceCategoryContainer>
        {categories.map((cat) => (
          <PlaceCategoryBtn
            selected={isSelected === cat}
            onClick={() => changeCategory(cat)}
          >
            {cat}
          </PlaceCategoryBtn>
        ))}
      </PlaceCategoryContainer>
      <ContentsContainer>
        {contentsData.map((contentDb) => (
          <MapContentCard
            contentDb={contentDb}
            toggleDetailShow={toggleDetailShow}
          />
        ))}
      </ContentsContainer>
    </Base>
  );
};

export default MapPlaceList;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 420px;
  height: calc(100% - 40px);

  position: absolute;
  left: 85.5px;

  background-color: #fff;
  z-index: 99;
  border-right: 1px solid #d9d9d9;
  padding: 20px;
`;

const PlaceCategoryContainer = styled.div`
  margin-top: 27px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

const PlaceCategoryBtn = styled.div<{ selected: boolean }>`
  border-radius: 40px;
  width: 180px;
  border: ${({ selected }) =>
    selected ? '1px solid #f97393;' : '1px solid #d9d9d9'};
  color: #323232;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  &:hover {
    border: 1px solid #f97393;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 25px;

  width: 100%;
`;
