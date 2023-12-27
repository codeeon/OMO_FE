import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import useInput from '../../../hooks/useInput';
import { CurrentLocationType } from '../../../model/interface';

interface Props {
  map: google.maps.Map | null;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
}

const Search: React.FC<Props> = ({ map, setCurrentLocation }) => {
  const [value, onClearHandler, onChangeHandler] = useInput();
  const [searchResult, setSearchResult] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);
  const [error, setError] = useState('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const service = new google.maps.places.PlacesService(map);

  const placeSearchCallback = (
    results: google.maps.places.PlaceResult[] | null,
    status: any,
  ) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setSearchResult(results);
      console.log(results);
    } else if (
      status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST ||
      status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
    ) {
      setError('검색 결과가 없습니다.');
    } else {
      setError('검색 결과에 오류가 있습니다.');
    }
  };

  useEffect(() => {
    // ps.keywordSearch(value, placesSearchCB);
    const request = {
      query: value,
      fields: [
        'business_status',
        'formatted_address',
        'geometry',
        'name',
        'photos',
        'types',
        'place_id',
        'current_opening_hours',
        'business_status',
        'address_components',
        'delivery',
        'editorial_summary',
        'formatted_address',
        'formatted_phone_number',
      ],
    };

    service.textSearch(request, placeSearchCallback);
    // service.findPlaceFromQuery(request, placeSearchCallback);

    if (!value) {
      setSearchResult(null);
      setError('');
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  }, [value]);

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
  };

  return (
    <Base onFocus={isFocus} ref={searchRef}>
      <Input
        placeholder="장소를 검색해 이동해 보세요!"
        value={value}
        onChange={(e) => onChangeHandler(e)}
        onFocus={() => setIsFocus(true)}
      />
      <SearchBtnWrapper>
        <SearchIcon />
      </SearchBtnWrapper>
      {isFocus && (
        <ResultContainer>
          {value &&
            searchResult?.map((res) => (
              <ResultItem onClick={() => moveSearchPlaceHandler(res)}>
                {res.name}
                <span>{res.formatted_address}</span>
              </ResultItem>
            ))}
          {!value && (
            <GuideContainer>
              <>장소명을 검색해 보세요 🔍</>
            </GuideContainer>
          )}
        </ResultContainer>
      )}
    </Base>
  );
};

export default Search;

const Base = styled.div<{ onFocus: boolean }>`
  width: 90%;
  min-height: 50px;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ onFocus }) => (onFocus ? '20px 20px 0 0 ' : '20px')};
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
  top: 49px;

  background-color: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 0 0 20px 20px;

  max-height: 260px;
  overflow-y: scroll;

  width: 100%;
  z-index: 2;
`;

const ResultItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 70px; // Adjusted the min-height for better spacing

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
    white-space: nowrap; // Prevents wrapping to the next line
    overflow: hidden; // Hides the content that overflows
  }
  text-overflow: ellipsis;
  white-space: nowrap; // Prevents wrapping to the next line
  overflow: hidden; // Hides the content that overflows
  font-size: 16px;
  font-weight: 700;
`;

const GuideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  z-index: 2;
`;
