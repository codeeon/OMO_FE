import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import {
  MapCurrentLocationType,
  MapLocationType,
} from '../../../../model/interface';

interface Props {
  setMapCenterLocation: React.Dispatch<SetStateAction<MapLocationType>>;
  setMyLoca: React.Dispatch<React.SetStateAction<MapCurrentLocationType>>;
  mapRef: React.RefObject<kakao.maps.Map>;
}

const MapSearchInput: React.FC<Props> = ({
  setMapCenterLocation,
  setMyLoca,
  mapRef,
}) => {
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>(
    [],
  );
  const [isError, setIsError] = useState('');

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const ps = new kakao.maps.services.Places();

  const placesSearchCB = (
    data: kakao.maps.services.PlacesSearchResult,
    status: any,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      setResult(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setIsError('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      setIsError('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  };

  useEffect(() => {
    ps.keywordSearch(value, placesSearchCB);
    if (!value) {
      setResult([]);
      setIsError('');
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  }, [value]);

  const moveMapCenterHandler = (
    placeName: string,
    districtName: string,
    lat: string,
    lng: string,
  ) => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBounds();
    setMapCenterLocation({
      center: { lat: Number(lat), lng: Number(lng) },
      isPanto: true,
      bounds: bounds,
    });

    setMyLoca({
      placeName: placeName,
      lat: Number(lat),
      lng: Number(lng),
    });
    setIsFocus(false);
    setResult([]);
    setIsError('');
  };

  return (
    <Base onFocus={isFocus}>
      <Input
        value={value}
        onChange={(e) => onChangeValue(e)}
        placeholder="장소 검색하기"
        onFocus={() => setIsFocus(true)}
      />
      <Btn>
        <CgSearch />
      </Btn>
      {isFocus && (
        <ResultContainer>
          {value ? (
            result.map((res) => (
              <ResultItem
                onClick={() =>
                  moveMapCenterHandler(
                    res.place_name,
                    res.address_name.split(' ')[1],
                    res.y,
                    res.x,
                  )
                }
              >
                {res.place_name}
              </ResultItem>
            ))
          ) : (
            <GuideContainer>
              <>장소명이나 게시물을 검색해보세요 🔍</>
            </GuideContainer>
          )}
        </ResultContainer>
      )}
    </Base>
  );
};

export default MapSearchInput;

const Base = styled.div<{ onFocus: boolean }>`
  box-sizing: border-box;
  margin: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 90%;
  min-height: 40px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ onFocus }) => (onFocus ? '20px 20px 0 0 ' : '20px')};
  position: relative;
  transition: all 300ms ease-in-out;
`;

const Input = styled.input`
  margin: 5px 15px;
  width: 80%;
  height: 30px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.color.text};
`;

const ResultContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  position: absolute;
  top: 39px;

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
  min-height: 50px;
  height: 50px;

  display: flex;
  justify-content: start;
  align-items: center;

  padding: 12px 15px;

  gap: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text};
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
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
`;
