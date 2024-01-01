import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Header from './Header';
import { LocationType } from '../../../model/interface';
import Card from './Card';
import { Virtuoso } from 'react-virtuoso';
const categories = ['전체', '음식점', '카페', '기타'];

interface Props {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  placeDatas: LocationType[] | undefined;
}

const PlaceList: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  placeDatas,
}) => {
  const changeCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <Base>
      <Search />
      <Header />
      <PlaceCategoryContainer>
        {categories.map((cat) => (
          <PlaceCategoryBtn
            key={cat}
            $selected={selectedCategory === cat}
            onClick={() => changeCategory(cat)}
          >
            {cat}
          </PlaceCategoryBtn>
        ))}
      </PlaceCategoryContainer>
      <ContentsContainer>
        <Virtuoso
          style={{ width: '100%', height: '100%' }}
          increaseViewportBy={0}
          itemContent={(index, placeDb) => {
            return <Card key={placeDb.latitude} placeDb={placeDb} />;
          }}
          data={placeDatas}
        />
      </ContentsContainer>
    </Base>
  );
};

export default PlaceList;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
const PlaceCategoryContainer = styled.div`
  box-sizing: border-box;
  margin: 17px 20px;
  width: 90%;
  height: 40px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

const PlaceCategoryBtn = styled.div<{ $selected: boolean }>`
  border-radius: 40px;
  border: ${({ $selected, theme }) =>
    $selected ? '1px solid #f97393;' : `1px solid ${theme.color.border2}`};
  color: #323232;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: ${({ theme }) => theme.color.text};
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
  gap: 7px;

  width: 100%;
  height: 100%;
`;
