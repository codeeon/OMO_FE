import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';
import { Map } from 'react-kakao-maps-sdk';
import { IoClose } from 'react-icons/io5';
import { SelectedInfoType } from '../../model/interface';

interface Props {
  selectedInfo: SelectedInfoType;
  setSelectedInfo: React.Dispatch<React.SetStateAction<SelectedInfoType>>;
}

const PostModalPlace: React.FC<Props> = ({ selectedInfo, setSelectedInfo }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<object[]>([]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    searchPlaceHandler(e);
  };

  const deleteInfoHandler = () => {
    setSelectedInfo({
      placeName: '',
      addressName: '',
      categoryName: '',
      latitude: '',
      longitude: '',
    });
    setSearchValue([]);
    setInputValue('');
  };

  const searchPlaceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(event.target.value, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchValue(data);
        console.log(data);
      }
    });
  };

  const selectInfoHandler = (
    placeName: string,
    adressName: string,
    categoryName: string,
    latitude: string,
    longitude: string,
  ) => {
    const filteredCategoryName =
      categoryName === '음식점' || categoryName === '카페'
        ? categoryName
        : '기타';
    setSelectedInfo({
      placeName: placeName,
      addressName: adressName,
      categoryName: filteredCategoryName,
      latitude: latitude,
      longitude: longitude,
    });
    console.log(selectedInfo);

    setInputValue('');
  };

  useEffect(() => {
    inputValue === '' && setSearchValue([]);
  }, [inputValue]);

  return (
    <Base>
      {!selectedInfo.placeName && (
        <SearchContainer>
          <LuMapPin />
          <SearchInput
            value={inputValue}
            placeholder="위치 정보를 추가해주세요"
            onChange={onChangeInputValue}
          />
        </SearchContainer>
      )}

      {selectedInfo.placeName && (
        <PlaceContainer>
          <PlaceName>
            {selectedInfo.placeName}
            <DeleteBtn onClick={deleteInfoHandler}>
              <IoClose />
            </DeleteBtn>
          </PlaceName>
          <AdressName>
            <LuMapPin />
            {selectedInfo.addressName}
          </AdressName>
        </PlaceContainer>
      )}
      {inputValue && (
        <ResultList>
          {searchValue.map((value) => (
            <ResultItemContainer
              onClick={() => {
                const address =
                  value.road_address_name === ''
                    ? value.address_name
                    : value.road_address_name;
                selectInfoHandler(
                  value.place_name,
                  address,
                  value.category_group_name,
                  value.x,
                  value.y,
                );
              }}
            >
              <ResultPlaceName>{value.place_name}</ResultPlaceName>
              <ResultAdress>
                {value.road_address_name === ''
                  ? value.address_name
                  : value.road_address_name}
              </ResultAdress>
            </ResultItemContainer>
          ))}
        </ResultList>
      )}
    </Base>
  );
};

export default PostModalPlace;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 25px;
  width: 100%;
  gap: 5px;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 250px;
  height: 20px;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

const ResultList = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 219px;
  overflow: scroll;

  background: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ResultItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 5px;
  padding: 10px 20px 10px 20px;
  &:hover {
    background: #eeeeee;
  }
  cursor: pointer;
  &:first-child {
    padding: 20px 20px 10px 20px;
  }
`;

const ResultPlaceName = styled.div`
  color: #111;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const ResultAdress = styled.div`
  color: #7c7c7c;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 13px;
  width: 100%;
`;

const PlaceName = styled.div`
  color: #000;

  font-family: Wanted Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 24px */

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 9px;
  width: 100%;
`;
const AdressName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #44a5ff;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
`;

const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #a5a5a5;
  font-size: 15px;
  padding: 1px;
  font-size: 16px;
  color: #a5a5a5;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    border: 1px solid #f97393;
    color: #f97393;
  }
`;
