import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { IoMdCafe } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { FaSubway } from 'react-icons/fa';
import { MapLocationType } from '../../../../model/interface';

interface Props {
  setMapCenterLocation: React.Dispatch<SetStateAction<MapLocationType>>;
}

const MapSearchInput: React.FC<Props> = ({ setMapCenterLocation }) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>(
    [],
  );
  const [isError, setIsError] = useState('');

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const ps = new kakao.maps.services.Places();

  const onClichHandler = () => {
    ps.keywordSearch(value, placesSearchCB);
  };

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
    }
  }, [value]);

  const moveMapCenterHandler = (lat: string, lng: string) => {
    setMapCenterLocation({
      center: { lat: Number(lat), lng: Number(lng) },
      isPanto: true,
    });
  };

  return (
    <Base onFocus={isFocus}>
      <Input
        value={value}
        onChange={(e) => onChangeValue(e)}
        placeholder="장소 검색하기"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <Btn onClick={onClichHandler}>
        <CgSearch />
      </Btn>
      {isFocus && (
        <ResultContainer>
          {value ? (
            result.map((res) => (
              <ResultItem onClick={() => moveMapCenterHandler(res.y, res.x)}>
                <IconWrapper>
                  {res.category_group_name === '지하철역' ? (
                    <FaSubway />
                  ) : res.category_group_name === '카페' ? (
                    <IoMdCafe />
                  ) : res.category_group_name === '음식점' ? (
                    <IoRestaurant />
                  ) : (
                    <FaLocationDot />
                  )}
                </IconWrapper>
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
  ${({ onFocus }) =>
    onFocus
      ? css`
          border: 1px solid #f97393;
          box-shadow: rgba(255, 183, 240, 0.4) 0px 0px 0px 3px;
        `
      : css`
          border: 1px solid #d9d9d9;
        `}

  border-radius: 32px;
  position: relative;
  transition: all 300ms ease-in-out;
`;

const Input = styled.input`
  margin: 5px 20px;
  width: 80%;

  border: none;
  outline: none;

  font-size: 14px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  position: absolute;
  top: 45px;

  padding: 14px 14px 8px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
  background-color: ${({ theme }) => theme.color.searchBg};

  border: 1px solid rgb(224, 224, 224);
  border-radius: 1rem;

  max-height: 500px;
  overflow-y: scroll;

  width: 100%;
  box-sizing: border-box;
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 2;
`;

const ResultItem = styled.div`
  width: 95%;
  min-height: 25px;
  height: 25px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text};
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  font-size: 14px;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-size: 20px;
  padding: 5px;
  color: #b0b0b0;
`;

const GuideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: #111;
  font-size: 14px;
`;
