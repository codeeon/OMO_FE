import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { SelectedInfoType } from '../../model/interface';
import { FaLocationDot } from 'react-icons/fa6';

interface Props {
  selectedInfo: SelectedInfoType;
  setSelectedInfo: React.Dispatch<React.SetStateAction<SelectedInfoType>>;
  searchValue: kakao.maps.services.PlacesSearchResult;
  setSearchValue: React.Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResult>
  >;
  map: google.maps.Map | null;
}

const GooglePlace: React.FC<Props> = ({
  selectedInfo,
  setSelectedInfo,
  searchValue,
  setSearchValue,
  map,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

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

  const findPlaceId = async (query: string) => {
    const { Place } = (await google.maps.importLibrary(
      'places',
    )) as google.maps.PlacesLibrary;
    const request = {
      query: query,
      fields: ['displayName', 'location'],
    };

    const { places } = await Place.findPlaceFromQuery(request);
    console.log(places[0].id);
  };

  const searchPlaceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(event.target.value, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchValue(data);
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
    setInputValue('');
  };

  const selectPlaceHandler = (
    result: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    const address =
      result.road_address_name === ''
        ? result.address_name
        : result.road_address_name;
    const placeName = result.place_name;
    const addressName = address;
    const categoryName = result.category_group_name;
    const latitude = result.y;
    const longitude = result.x;
    const filteredCategoryName =
      categoryName === '음식점' || categoryName === '카페'
        ? categoryName
        : '기타';
    findPlaceId(placeName);
    setSelectedInfo({
      placeName: placeName,
      addressName: addressName,
      categoryName: filteredCategoryName,
      latitude: latitude,
      longitude: longitude,
    });
    setInputValue('');
  };

  useEffect(() => {
    inputValue === '' && setSearchValue([]);
  }, [inputValue]);

  return (
    <Base>
      {!selectedInfo.placeName && (
        <SearchContainer>
          <FaLocationDot />
          <SearchInput
            value={inputValue}
            placeholder="여기를 클릭해 위치를 추가해 보세요"
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
          {searchValue.map((result) => (
            <ResultItemContainer onClick={() => selectPlaceHandler(result)}>
              <ResultPlaceName>{result.place_name}</ResultPlaceName>
              <ResultAdress>
                {result.road_address_name === ''
                  ? result.address_name
                  : result.road_address_name}
              </ResultAdress>
            </ResultItemContainer>
          ))}
        </ResultList>
      )}
    </Base>
  );
};

export default GooglePlace;

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
  svg {
    color: #a5a5a5;
  }
`;

const SearchInput = styled.input`
  width: 250px;
  height: 20px;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.color.bg};
  &::placeholder {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.sub};
    font-family: 'Wanted Sans Variable';
  }
  font-family: 'Wanted Sans Variable';
`;

const ResultList = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 300px;
  overflow: scroll;

  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 8px;
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
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  &:first-child {
    padding: 20px 20px 10px 20px;
  }
`;

const ResultPlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const ResultAdress = styled.div`
  color: ${({ theme }) => theme.color.sub2};

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
  color: ${({ theme }) => theme.color.text};

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
