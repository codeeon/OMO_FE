import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import useMapStore from '../../../store/location/googleMapStore';
import {
  placeSearchCallback,
  textSearchFields,
} from '../../../utils/googleSearch.ts/textSearch';
import _ from 'lodash';

const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchResult, setSearchResult] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { setCurrentLocation } = useMapStore();
  const { map } = useMapStore();

  const clearValueHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
    debouncedSearch(e.target.value);
  };

  // @ts-ignore
  const searchRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = _.debounce((query: string) => {
    const request = {
      query,
      fields: textSearchFields,
    };

    const service = new google.maps.places.PlacesService(map!);
    service.textSearch(request, (results, status) => {
      placeSearchCallback(results, status, setSearchResult);
    });

    if (!query) {
      setSearchResult(null);
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  }, 500);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isFocus &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isFocus]);

  const moveSearchPlaceHandler = (res: google.maps.places.PlaceResult) => {
    const lat = res.geometry?.location?.lat();
    const lng = res.geometry?.location?.lng();
    setCurrentLocation({ lat: lat, lng: lng });
    clearValueHandler();
  };

  return (
    <Base $onFocus={isFocus} ref={searchRef}>
      <Input
        placeholder="장소를 검색해 이동해 보세요!"
        ref={inputRef}
        onChange={(e) => onChangeHandler(e)}
        onFocus={() => setIsFocus(true)}
      />
      <SearchBtnWrapper>
        <SearchIcon />
      </SearchBtnWrapper>
      {isFocus && (
        <ResultContainer>
          {inputRef.current?.value &&
            searchResult?.map((res, idx) => (
              <ResultItem key={idx} onClick={() => moveSearchPlaceHandler(res)}>
                {res.name}
                <span>{res.formatted_address}</span>
              </ResultItem>
            ))}
        </ResultContainer>
      )}
    </Base>
  );
};

export default Search;

const Base = styled.div<{ $onFocus: boolean }>`
  width: 90%;
  min-height: 50px;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ $onFocus }) => ($onFocus ? '20px 20px 0 0 ' : '20px')};
  box-sizing: border-box;
  margin: 20px 20px 0 20px;

  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  transition: all 300ms ease-in-out;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin: 0 20px;
  outline: none;
  border: none;
  width: 80%;
  font-size: 16px;
  font-weight: 700;
  background: transparent;
  color: ${({ theme }) => theme.color.text};
`;

const SearchBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  position: absolute;
  top: 47px;
  left: -1px;

  background-color: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 0 0 20px 20px;

  max-height: 260px;
  overflow-y: scroll;

  width: 100.5%;
  z-index: 2;
`;

const ResultItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  padding: 12px 20px;

  gap: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text};
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }

  span {
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
`;
